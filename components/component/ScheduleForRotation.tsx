
"use client";
import React, { useState, useEffect } from "react";

interface Personnel {
  id: string;
  name: string;
  phone: string;
}

interface ScheduleDetail {
  role: string;
  name: string;
  location: string;
  shift: string;
}
interface ConstableData {
  "क्रम सं0": string;
  "नाम अधि0/कर्म0": string;
  __2: string; // Adjust this according to the actual key for phone number
}

interface Constable {
  __1: string; // Assuming '__1' is the key for name
  __2: string; // Assuming '__2' is the key for phone number
}

const fetchConstables = async () => {
  try {
    const response = await fetch("/constable.json");
    const data: Constable[] = await response.json(); // Annotate data with Constable[]

    const mappedData = data.map((item: Constable, index: number) => ({
      id: `C${index + 1}`,
      name: item.__1,
      phone: item.__2,
    }));

    return mappedData.filter((item) => item.name.trim() !== "");
  } catch (error) {
    console.error("Error fetching constables:", error);
    return [];
  }
};

const fetchConstables2 = async () => {
  try {
    const response = await fetch("/constable2.json");
    const data: ConstableData[] = await response.json(); // Annotate data with ConstableData[]
    console.log("const", data);
    const mappedData = data.map((item: ConstableData) => ({
      id: `C2${item["क्रम सं0"]}`,
      name: item["नाम अधि0/कर्म0"],
      phone: item["__2"], // Adjust this according to the actual key for phone number
    }));
    return mappedData.filter((item) => item.name.trim() !== "");
  } catch (error) {
    console.error("Error fetching constables2:", error);
    return [];
  }
};

interface TSI {
  "": string; // Assuming '' is the key for name
  __2: string; // Assuming '__2' is the key for phone number
}

const fetchTSIs = async () => {
  try {
    const response = await fetch("/tsi.json");
    const data: TSI[] = await response.json(); // Annotate data with TSI[]
    console.log(data);

    const mappedData = data.map((item: TSI, index: number) => ({
      id: `TSI${index + 1}`,
      name: item[""],
      phone: item["__2"],
    }));

    console.log("tsi", mappedData);

    return mappedData.filter((item) => item.name.trim() !== "");
  } catch (error) {
    console.error("Error fetching TSIs:", error);
    return [];
  }
};

const junctions = [
  {
    id: "विश्वकर्मा द्वार रात्रि",
    subJunctions: [
      "विश्वकर्मा द्वार रात्रि"
    ]
  },
  {
    id: "जाजमऊ चौराहा",
    subJunctions: [
      "बीमा चौराहा",
      "जे0के0 चौराहा",
      "जाजमऊ विश्वकर्मा द्वार"
    ]
  },
  {
    id: "हरजेन्दर नगर",
    subJunctions: [
      "हरजेन्दर नगर",
      "पुराना थाना चकेरी",
      "मा0 वि0 सभा अध्यक्ष आवास मोड़ लाल बंगला",
      "एयरफोर्स स्टेशन"
    ]
  },
  {
    id: "रामा देवी चौराहा",
    subJunctions: [
      "एचएएल",
      "रामादेवी चौराहा",
      "रामादेवी सब्जीमण्डी",
      "ई- रिक्शा डायवर्जन (रामादेवी रैम्प के पीछे लखनऊ साइड़)",
      "ई- रिक्शा डायवर्जन (फतेहपुर साइड़)",
      "जगदंबा पेट्रोल पम्प",
      "शिवकटरा मोड"
    ]
  },
  {
    id: "अहिरवॉ",
    subJunctions: [
      "एयरपोर्ट कट",
      "अहिरवॉ"
    ]
  },
  {
    id: "श्यामनगर चौराहा",
    subJunctions: [
      "श्याम नगर चौराहा",
      "छप्पन भोग चौराहा",
      "पीएसी पुल छप्पन भोग साइड",
      "देहली सुजानपुर कट (हंस मन्दिर)"
    ]
  },
  {
    id: "मनोज इण्टरनेशनल / पीएसी मोड",
    subJunctions: [
      "मनोज इन्टरनेशनल",
      "सीओडी पुल टाटमिल साइड"
    ]
  },
  {
    id: "कोयला नगर",
    subJunctions: [
      "कोयला नगर"
    ]
  },
  {
    id: "रामा देवी रैम्प (नौबस्ता साइड अंडर पास)",
    subJunctions: [
      "रामादेवी रैम्प (गुरू हर राय साइड)",
      "रामादेवी रैम्प (मंगलाविहार साइड)"
    ]
  },
  {
    id: "राकेट तिराहा",
    subJunctions: [
      "राकेट तिराहा",
      "10 नं0 कैन्टीन",
      "सिविल एयरो ड्रम",
      "रेलवे स्टेशन गेट नं0 1 साइड"
    ]
  },
  {
    id: "मुरे कम्पनीपुल कैण्ट साइड",
    subJunctions: [
      "मुरे कम्पनीपुल कैण्ट साइड"
    ]
  },
  {
    id: "नरौना चौराहा",
    subJunctions: [
      "नरौना चौराहा",
      "मुरे कम्पनीपुल नरौनासाइड"
    ]
  },
  {
    id: "पनचक्की चौराहा",
    subJunctions: [
      "पनचक्की चौराहा",
      "झाडीबाबा पडाव"
    ]
  },
  {
    id: "चार्लिस चौराहा",
    subJunctions: [
      "फूलबाग चौराहा",
      "गिलिश बाजार कट",
      "चार्लिस चौराहा",
      "किला तिराहा"
    ]
  },
  {
    id: "मेघदूत",
    subJunctions: [
      "मेघदूत तिराहा",
      "व्यायामशाला"
    ]
  },
  {
    id: "सरसैयाघाट",
    subJunctions: [
      "सरसैयाघाट",
      "पुलिस लाइन मेन गेट"
    ]
  },
  {
    id: "बडा चौराहा",
    subJunctions: [
      "बड़ा चौराहा",
      "कोतवाली चौराहा",
      "लैण्डमार्क",
      "भार्गव हास्पिटल चौराहा",
      "आर0ओ0 प्लांट सब्जी मण्डी तिराहा वन-वे",
      "बड़ा चौराहा से कोतवाली रोड",
      "उर्सला हॉस्पीटल यू-टर्न /ठग्गू के लड्डू रोड"
    ]
  },
  {
    id: "चेतना चौराहा",
    subJunctions: [
      "चेतना चौराहा वन-वे",
      "डीएम कार्यालय गेट समय प्रात: 09.00 से 17.00 बजे तक",
      "कचहरी गेट तिराहा"
    ]
  },
  {
    id: "डीजे गेट",
    subJunctions: [
      "डीजे गेट समय प्रात: 09.00 से 17.00 बजे तक"
    ]
  },
  {
    id: "महिला थाना",
    subJunctions: [
      "महिला थाना प्रातः 09.00 से 17.00 बजे तक",
      "गोरा कब्रिस्तान के पीछे",
      "महिला थाना से गोरा कब्रिस्तान पीछे गस्त प्रातः 09.00 से 17.00 बजे तक",
      "महिला थाना से लट्ठाकोठी गस्त मैन रोड साइड"
    ]
  },
  {
    id: "लट्ठा कोठी",
    subJunctions: [
      "लठ्ठा कोठी प्रातः 09.00 से 17.00 बजे तक",
      "डीएवी तिराहा प्रातः 09.00 से 17.00 बजे तक",
      "तिकोनिया पार्क"
    ]
  },
  {
    id: "ग्रीनपार्क",
    subJunctions: [
      "वीआईपी रोड",
      "ग्रीन पार्क चौराहा"
    ]
  },
  {
    id: "एमजी कालेज",
    subJunctions: [
      "एमजी कालेज"
    ]
  },
  {
    id: "पुलिस ऑफिस",
    subJunctions: [
      "पुलिस ऑफिस",
      "पुलिस ऑफिस गेट वन-वे प्रात: 09.00 से 17.00 बजे तक",
      "पुलिस ऑफिस पार्किंग प्रातः 09.00 से 17.00 बजे तक"
    ]
  },
  {
    id: "मूलगंज",
    subJunctions: [
      "मूलगंज चौराहा यू-टर्न",
      "कुली बाजार यू-टर्न मूलगंज",
      "शरमन इन्टरप्राइजेज के सामने कट",
      "श्याम बिहारी मिश्रा चौक यू-टर्न",
      "अहिंसा चौक मूलगंज"
    ]
  },
  {
    id: "कारसेट",
    subJunctions: [
      "कारसेट/ परेड चौराहा",
      "सद्भवना",
      "यतीमखाना",
      "नई सड़क",
      "किताब मार्केट/आईएमए"
    ]
  },
  {
    id: "परेड चौराहा",
    subJunctions: [
      "नवीन मार्केट",
      "म्योर मील तिराहा"
    ]
  },
  {
    id: "सर्किट हाऊस",
    subJunctions: [
      "जयपुरिया क्रासिंग",
      "मैथाडिस्क स्कूल",
      "नया पुल उन्नाव बार्डर",
      "सर्किट हाऊस प्रातः 09.00 से 17.00 बजे तक"
    ]
  },
  {
    id: "घण्टाघर चौराहा",
    subJunctions: [
      "घण्टाघर चौराहा दिन",
      "रेलway स्टेशन गेट नं0 02"
    ]
  },
  {
    id: "घण्टाघर चौराहा रात्रि",
    subJunctions: [
      "घण्टाघर चौराहा रात्रि"
    ]
  },
  {
    id: "एक्सप्रेस रोड",
    subJunctions: [
      "हूलागंज",
      "शनिदेव मन्दिर एक्शप्रेस रोड",
      "मालगोदाम",
      "कोपरगंज"
    ]
  },
  {
    id: "कल्यानपुर क्रसिंग",
    subJunctions: [
        "कल्यानपुर क्रासिंग",
        "आरक्षण केंद्र ( कल्यानपुर क्रासिंग )",
        "बिठूर रोड तिराहा",
        "बिठूूर रोड तिराहा रात्रि",
        "गोवा गार्डेन",
    ]
},
{
    id: "सीएनजी पम्प पनकी रोड़ कल्याणपुर",
    subJunctions: [
        "न्यू शिवली रोड तिराहा",
        "पुराना शिवली रोड तिराहा डायवर्जन",
        "स्टेशन रोड तिराहा पुराना शिवली रोड़",
        "सीएनजी पम्प पनकी रोड़ कल्याणपुर",
    ]
},
{
    id: "गुरुदेव चौराहा",
    subJunctions: [
        "गुरुदेव चौराहा",
        "मैट्रो यार्ड कट"
    ]
},
{
    id: "इन्द्रानगर मोड तिराहा",
    subJunctions: [
        "इन्द्रानगर मोड तिराहा",
        "बगिया क्रॉसिंग",
        "एस0पी0एम0 मैट्रो स्टेशन कट"
    ]
},
{
    id: "मन्धना चौराहा",
    subJunctions: [
        "मन्धना चौराहा",
        'ब्लू-वर्ड पार्क (समय 09.00 बजे से 17.00 बजे तक)',
        "रामा विश्वविद्यालय मंधना"
    ]
},
{
    id: "दलहन क्रॉसिंग",
    subJunctions: [
        "दलहन क्रॉसिंग",
        "विश्वविद्यालय गेट"
    ]
},
{
    id: "आई0आई0टी0/नारामऊ",
    subJunctions: [
        "आई0आई0टी0 गेट",
        "एल0एम0को0 क्रॉसिंग"
    ]
},
{
    id: "सिंहपुर चौराहा",
    subJunctions: [
        "सिंहपुर चौराहा प्रात: 09.00 से शाम 17:00 तक"
    ]
},
{
    id: "कस्बा बिठूर चौराहा",
    subJunctions: [
        "कस्बा बिठूर चौराहा"
    ]
},
{
    id: "भाटिया/पनकी /शताब्दी नगर/आवास विकास",
    subJunctions: [
        "आवास विकास नहर",
        "नो इन्ट्री भाटिया तिराहा",
        "शताब्दी द्वार पनकी",
        "शताब्दी द्वार पनकी फ्लाईओवर",
        "गंगागंज क्रासिंग पनकी",
        "पनकी सब्जी मण्डी चौराहा",
        "पनकी सब्जी मण्डी पुल के नीचे डायवर्जन"
    ]
},
{
    id: "भौती वाईपास चौराहा",
    subJunctions: [
        "भौती वाईपास चौराहा",
        "भौती अण्डर पास"
    ]
},
{
    id: "चकरपुर मण्डी",
    subJunctions: [
        "चकरपुर मण्डी चौराहा"
    ]
},
{
    id: "नो इंट्री अर्मापुर",
    subJunctions: [
        "नो इंट्री अर्मापुर",
        "एम0आई0जी0 तिराहा"
    ]
},
{
    id: "चौबेपुर दिन",
    subJunctions: [
        "चौबेपुर चौराहा"
    ]
},
{
    id: "बिल्हौर",
    subJunctions: [
        "बिल्हौर चौराहा"
    ]
},{
  id: "झकरकटी बस अड्डा",
  subJunctions: [
      "झकरकटी बस अड्डा"
  ]
},
{
  id: "टाटमील चौराहा दिन",
  subJunctions: [
      "टाटमील चौराहा दिन",
      "लंगड़िया",
      "रेलवे स्टेशन मोड"
  ]
},
{
  id: "टाटमिल चौराहा रात्रि/झकरकटी बसअड्डा रात्रि",
  subJunctions: [
      "टाटमिल रात्रि नोट-टीएसआई ड्यूटी समय 20.00 से 08.00 बजे तक तथा कर्म0गणों ड्यूटी समय 23.00 से 07.00 बजे तक ।"
  ]
},
{
  id: "यशोदा नगर चौराहा",
  subJunctions: [
      "यशोदा नगर चौराहा"
  ]
},
{
  id: "नौबस्ता चौराहा दिन",
  subJunctions: [
      "नौबस्ता चौराहा",
      "पुरानी मौरंग मण्डी",
      "बसंत बिहार चौराहा",
      "शिवाजी पुलिया कट (नौबस्ता)"
  ]
},
{
  id: "नौवस्ता बम्बा",
  subJunctions: [
      "नौबस्ता बम्बा",
      "धोबिन पुलिया",
      "दासू कुआं चौराहा",
      "मछरिया कट",
      "त्रिमूर्ति अपार्टमेन्ट तिराहा",
      "समाधी पुलिया",
      "नई मौरंग मण्डी"
  ]
},
{
  id: "नौवस्ता चौराहा रात्रि",
  subJunctions: [
      "नौबस्ता चौराहा रात्रि नोट-टीएसआई ड्यूटी समय 20.00 से 08.00 बजे तक तथा कर्म0गणों ड्यूटी समय 23.00 से 07.00 बजे तक ।"
  ]
},
{
  id: "यादव मार्केट",
  subJunctions: [
      "यादव मार्केट चौराहा/बर्रा"
  ]
},
{
  id: "बसंत पेट्रोल पम्प",
  subJunctions: [
      "बसंत पेट्रोल पम्प",
      "कार्गिल"
  ]
},
{
  id: "एल0एम0एल",
  subJunctions: [
      "गैस प्लाण्ट",
      "एल0एम0एल चौराहा(समय 09.00 बजे से 17.00 बजे तक)"
  ]
},
{
  id: "सचान गेस्ट हाउस / शास्त्री चौक",
  subJunctions: [
      "सचान गेस्ट हाउस चौराहा",
      "शास्त्री चौक"
  ]
},
{
  id: "नन्दलाल चौराहा",
  subJunctions: [
      "नन्दलाल चौराहा",
      "सीटीआई चौराहा"
  ]
},
{
  id: "चावला",
  subJunctions: [
      "चावला चौराहा"
  ]
},
{
  id: "वनवे गोविन्दपुरी पुल",
  subJunctions: [
      "गोविन्द नगर पुराना पुल नीचे"
  ]
},
{
  id: "दादानगर/फायर स्टेशन फज0",
  subJunctions: [
      "दादानगर चौराहा",
      "वन वे दादानगर पुल",
      "फायर स्टेशन फज0",
      "मिश्रीलाल चौराहा से वन-वे तक"
  ]
},
{
  id: "बारादेवी चौराहा",
  subJunctions: [
      "बारादेवी चौराहा",
      "जूही डिपो",
      "मिलिट्री कैम्प चौराहा"
  ]
},
{
  id: "गौशाला चौराहा",
  subJunctions: [
      "गौशाला चौराहा",
      "सोटे बाबा मन्दिर किदवई नगर",
      "गौशाला द्वितीय"
  ]
},
{
  id: "बगाही चौराहा/साइड नं0 01 चौराहा",
  subJunctions: [
      "साइड नं0 01 चौराहा",
      "बगाही चौराहा",
      "नयापुल बाबूपुरवा",
      "किदवई नगर चौराहा"
  ]
},
{
  id: "घाटमपुर चौराहा",
  subJunctions: [
      "घाटमपुर चौराहा"
  ]
},
{
  id: "घाटमपुर रात्रि",
  subJunctions: [
      "घाटमपुर चौराहा रात्रि"
  ]
},
{
  id: "रमईपुर चौराहा",
  subJunctions: [
      "रमईपुर चौराहा",
      "बिधनू नहरिया"
  ]
},    {
  id: "मर्चेन्ट चेम्बर",
  subJunctions: [
      "मर्चेन्ट चेम्बर तिराहा",
      "टैफ्को तिराहा",
      "ग्वालटोली कट वीआईपी रोड़"
  ]
},
{
  id: "कर्नलगंज चौराहा",
  subJunctions: [
      "कर्नलगंज चौराहा (थाने के सामने वन-वे पर)",
      "लाल इमली चौराहा",
      "सिलवर्टन चौराहा"
  ]
},
{
  id: "ग्वालटोली चौराहा",
  subJunctions: [
      "सिलिंग हाउस स्कूल समय 08.00 बजे से 16.00 वजे तक",
      "ग्वालटोली चौराहा",
      "कमाण्ड हाउस गेट"
  ]
},
{
  id: "कम्पनी बाग चौराहा",
  subJunctions: [
      "कम्पनी बाग चौराहा",
      "पकडिया तिराहा नबावगंज",
      "गोपाला तिराहा",
      "बेण्डी तिराहा",
      "लिटिल फॉक्स स्कूल तिराहा समय 10:00 से 14:00 बजे व 17.00 से 21.00 तक"
  ]
},
{
  id: "राजीव पेट्रोल पम्प",
  subJunctions: [
      "राजीव पेट्रोल पम्प",
      "एलनगंज तिराहा",
      "छः बगलिया चौराहा",
      "आर्य नगर तिराहा"
  ]
},
{
  id: "नबावगंज",
  subJunctions: [
      "चिडियाघर तिराहा",
      "पहलवानपुर तिराहा",
      "कर्बला चौराहा"
  ]
},
{
  id: "विकास नगर /मैनावती मार्ग",
  subJunctions: [
      "मैनावती मार्ग तिराहा"
  ]
},
{
  id: "रानीघाट तिराहा",
  subJunctions: [
      "रानीघाट चौराहा",
      "भैरवघाट चौराहा",
      "रेव थ्री चौराहा"
  ]
},
{
  id: "हैलट तिराहा / आर सी होटल चौराहा",
  subJunctions: [
      "गैस्टोलीवर",
      "आर0सी0 होटल चौराहा",
      "मर्चरी गेट कट यू टर्न",
      "हैलट हास्पिटल तिराहा",
      "हैलट इमरजेन्शी गेट",
      "नरेन्द्र मोहन सेतु",
      "स्वरुप नगर चौराहा",
      "हर्ष नगर चौराहा",
      "मोतीझील"
  ]
},
{
  id: "ईदगाह चौराहा/ रामबाग/ब्रह्मनगर",
  subJunctions: [
      "ईदगाह चौराहा",
      "बजरिया वन-वे",
      "बेनाझावर तिराहा",
      "रामबाग चौराहा",
      "ब्रह्मनगर चौराहा"
  ]
},
{
  id: "कोकाकोला चौराहा",
  subJunctions: [
      "भारत पेट्रोल पम्प कट(CNG)",
      "कोकाकोला चौराहा",
      "कमला नगर चौराहा",
      "कोकाकोला यू-टर्न (गोल चौराहा साइड)",
      "दक्षिण मुखी हनुमान मन्दिर / पासपोर्ट ऑफिस कट यू-टर्न"
  ]
},
{
  id: "गुमटी नं0 05 चौराहा",
  subJunctions: [
      "गुमटी नं0 05 यू-टर्न जरीब चौकी साइड",
      "गुमटी नं0 05 चौराहा"
  ]
},
{
  id: "जरीब चौकी चौराहा",
  subJunctions: [
      "जरीब चौकी चौराहा",
      "जरीब चौकी चौराहा (रात्रि)",
      "संगीत टाकीज कट जीटी रोड़",
      "बाँके बिहारी पॉपुलर धर्म काँटा जरीब चौकी",
      "लैनन पार्क"
  ]
},
{
  id: "अफीम कोठी चौराह/सीएनजी पम्प/रेलवे स्टेशन कट",
  subJunctions: [
      "अफीम कोठी चौराहा",
      "पोस्ट आॉफिस कट यू-टर्न",
      "अफीम कोठी सीएनजी पम्प",
      "थाना रायपुरवा कट तिराहा"
  ]
},
{
  id: "कोपरगंज तिराहा",
  subJunctions: [
      "कोपरगंज तिराहा"
  ]
},
{
  id: "डिप्टीपडाव बांस मण्डी चौराहा",
  subJunctions: [
      "डिप्टी पढाव चौराहा",
      "भारत पेट्रोलियम यूटर्न डिप्टी पडाव (डायवर्जन ड्यूटी)",
      "मन्दिर मोड यू टर्न डिप्टी पडाव (डायवर्जन ड्यूटी)",
      "बांस मण्डी चौराहा",
      "चाचा नेहरू तिराहा"
  ]
},
{
  id: "संतनगर चौराहा / गुमटीरोड",
  subJunctions: [
      "संतनगर चौराहा",
      "मरियमपुर चौराहा",
      "चेन फैक्ट्री चौराहा",
      "मनोज पान भण्डार चौराहा",
      "गुर्जर अस्पताल यू टर्न",
      "कैन्डी फ्लास स्कूल यू टर्न",
      "पालीवाल तिराहा"
  ]
},
{
  id: "फजलगंज चौराहा",
  subJunctions: [
      "खोयामण्डी चौराहा",
      "फजलगंज चौराहा"
  ]
},
{
  id: "बीओबी चौराहा",
  subJunctions: [
      "बीओबी चौराहा",
      "बस कारखाना"
  ]
},
{
  id: "विजय नगर चौराहा/सब्जी मण्डी",
  subJunctions: [
      "विजय नगर चौराहा",
      "विजय नगर सब्जी मण्डी"
  ]
},
{
  id: "गोल चौराहा/ गुटैय्या क्रासिंग",
  subJunctions: [
      "गुटैय्या क्रसिंग",
      "गुटैैय्या क्रासिंग (रेवमोती मॉल साइड)",
      "गोल चौराहा",
      "हृदय रोग संस्थान कट"
  ]
},
{
  id: "नमक फैक्ट्री /डबलपुलिया तिराहा",
  subJunctions: [
      "डबलपुलिया तिराहा",
      "नमक फैक्ट्री चौराहा",
      "नीर क्षीण चौराहा",
      "छपेडा पुलिया"
  ]
},
{
  id: "एन्जल हॉस्पिटल तिराहा/ देवकी चौराहा / रेवमोती / डीपीएस स्कूल तिराहा/गुटैया क्रासिंग के पहले/रीजेंशी हास्पिटल",
  subJunctions: [
      "सर्वोदय नगर तिराहा",
      "एन्जल हॉस्पिटल तिराहा",
      "रेवमोती मॉल तिराहा",
      "देवकी चौराहा"
  ]
},
{
  id: "रावतपुर तिराहा",
  subJunctions: [
      "रावतपुर तिराहा",
      "रावतपुर मैट्रो स्टेशन कट"
  ]
},
{
  id: "शारदा नगर/ गीतानगर क्रासिंग",
  subJunctions: [
      "गीता नगर क्रासिंग",
      "शारदा नगर क्रासिंग",
      "शारदा नगर क्रासिंग यू-टर्न"
  ]
}


];

const rotatePersonnel = (
  weekNumber: number,
  tsis: Personnel[],
  constables: Personnel[],
  homeGuards: Personnel[]
) => {
  const schedule: { week: number; details: ScheduleDetail[] } = {
    week: weekNumber,
    details: [],
  };

  const shifts = ["Morning", "Evening"];
  const shuffledTSIs = [...tsis].sort(() => Math.random() - 0.5);
  const shuffledConstables = [...constables].sort(() => Math.random() - 0.5);
  const shuffledHomeGuards = [...homeGuards].sort(() => Math.random() - 0.5);

  // Log all junctions and sub-junctions
  console.log(`Week ${weekNumber} Junctions and Sub-Junctions:`);
  junctions.forEach(junction => {
    console.log(`Main Junction: ${junction.id}`);
    junction.subJunctions.forEach(subJunction => {
      console.log(`  Sub-Junction: ${subJunction}`);
    });
  });

  // Assign TSIs to main junctions
  shuffledTSIs.forEach((tsi, index) => {
    const tsiJunction = junctions[index % junctions.length];
    schedule.details.push({
      role: "TSI",
      name: tsi.name,
      location: tsiJunction.id,
      shift: "", // Assuming TSIs don't have shifts
    });
  });

  let personnelIndex = 0;
  junctions.forEach((junction) => {
    junction.subJunctions.forEach((subJunction, subIndex) => {
      const shift = shifts[personnelIndex % shifts.length];
      if (personnelIndex < shuffledConstables.length) {
        const constable = shuffledConstables[personnelIndex];
        schedule.details.push({
          role: "Constable",
          name: constable.name,
          location: subJunction,
          shift,
        });
      }

      if (personnelIndex < shuffledHomeGuards.length) {
        const homeGuard = shuffledHomeGuards[personnelIndex];
        schedule.details.push({
          role: "Home Guard",
          name: homeGuard.name,
          location: subJunction,
          shift,
        });
      }

      personnelIndex++;
    });
  });

  return schedule;
};

const ScheduleForRotation: React.FC = () => {
  const [schedule, setSchedule] = useState<
    { week: number; details: ScheduleDetail[] }[]
  >([]);
  const [currentWeek, setCurrentWeek] = useState<number>(1);
  const [filterPosition, setFilterPosition] = useState<string | null>(null);
  const [filterName, setFilterName] = useState<string | null>(null);
  const [editedDetails, setEditedDetails] = useState<{
    [key: string]: ScheduleDetail;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [constables1, constables2, tsis] = await Promise.all([
          fetchConstables(),
          fetchConstables2(),
          fetchTSIs(),
        ]);

        console.log("Constables:", [...constables1, ...constables2]);
        console.log("TSIs:", tsis);
        const constables = [...constables1, ...constables2];

        const homeGuards = [
          { id: "HG1", name: "HG 123 Bharat Singh", phone: "9876543210" },
          { id: "HG2", name: "HG 234 Shyam Lal", phone: "9123456780" },
          { id: "HG3", name: "HG 345 Ram Singh", phone: "9988776650" },
          { id: "HG4", name: "HG 456 Ramesh Kumar", phone: "9876543211" },
          { id: "HG5", name: "HG 567 Mohan Lal", phone: "9876543212" },
          { id: "HG6", name: "HG 678 Suresh Kumar", phone: "9876543213" },
          { id: "HG7", name: "HG 789 Rakesh Singh", phone: "9876543214" },
          { id: "HG8", name: "HG 890 Ajay Kumar", phone: "9876543215" },
          { id: "HG9", name: "HG 901 Vijay Kumar", phone: "9876543216" },
          { id: "HG10", name: "HG 012 Kamal Singh", phone: "9876543217" },
        ];

        const newSchedule = [];
        for (let week = 1; week <= 4; week++) {
          console.log(`Generating schedule for week ${week}`);
          const weekSchedule = rotatePersonnel(week, tsis, constables, homeGuards);
          newSchedule.push(weekSchedule);

          // Log the week schedule
          console.log(`Week ${week} Schedule:`);
          weekSchedule.details.forEach((detail, index) => {
            console.log(`  ${index + 1}. Role: ${detail.role}, Name: ${detail.name}, Location: ${detail.location}, Shift: ${detail.shift}`);
          });
        }
        setSchedule(newSchedule);

        // Save initial fetched schedule to localStorage
        localStorage.setItem("schedule", JSON.stringify(newSchedule));
      } catch (error) {
        console.error("Error fetching or parsing JSON file:", error);
      }
    };

    // Load saved schedule from localStorage if it exists
    const savedSchedule = localStorage.getItem("schedule");
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    } else {
      fetchData();
    }

    // Load saved edited details from localStorage if it exists
    const savedEditedDetails = localStorage.getItem("editedDetails");
    if (savedEditedDetails) {
      setEditedDetails(JSON.parse(savedEditedDetails));
    }
  }, []);

  const handleNextWeek = () => {
    if (currentWeek < schedule.length) {
      setCurrentWeek(currentWeek + 1);
    }
  };

  const handlePreviousWeek = () => {
    if (currentWeek > 1) {
      setCurrentWeek(currentWeek - 1);
    }
  };

  const handleEdit = (
    week: number,
    detailIndex: number,
    field: keyof ScheduleDetail,
    value: string
  ) => {
    setEditedDetails((prev) => ({
      ...prev,
      [`${week}-${detailIndex}`]: {
        ...prev[`${week}-${detailIndex}`],
        [field]: value,
      },
    }));

    // Save edited details to localStorage
    localStorage.setItem(
      "editedDetails",
      JSON.stringify({
        ...editedDetails,
        [`${week}-${detailIndex}`]: {
          ...editedDetails[`${week}-${detailIndex}`],
          [field]: value,
        },
      })
    );
  };

  const saveChanges = () => {
    const newSchedule = schedule.map((weekSchedule) => ({
      ...weekSchedule,
      details: weekSchedule.details.map((detail, detailIndex) => ({
        ...detail,
        ...editedDetails[`${weekSchedule.week}-${detailIndex}`],
      })),
    }));
    setSchedule(newSchedule);
    setEditedDetails({});
    localStorage.setItem("schedule", JSON.stringify(newSchedule));
    localStorage.removeItem("editedDetails");
  };

  const filteredSchedule = schedule.map((weekSchedule) => ({
    ...weekSchedule,
    details: weekSchedule.details.filter((detail) => {
      const matchesPosition =
        !filterPosition ||
        filterPosition === "All" ||
        detail.role === filterPosition;
      const matchesName =
        !filterName ||
        detail.name.toLowerCase().includes(filterName.toLowerCase());
      return matchesPosition && matchesName;
    }),
  }));

  const currentWeekSchedule = filteredSchedule.find(
    (weekSchedule) => weekSchedule.week === currentWeek
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mb-2 md:mb-0"
          onClick={handlePreviousWeek}
          disabled={currentWeek === 1}
        >
          Previous Week
        </button>
        <h3 className="text-xl font-bold mb-2 md:mb-0">Week {currentWeek}</h3>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleNextWeek}
          disabled={currentWeek === schedule.length}
        >
          Next Week
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-4">
        <label htmlFor="filterPosition" className="font-semibold mb-2 md:mb-0">
          Filter by Position:
        </label>
        <select
          id="filterPosition"
          value={filterPosition ?? "All"}
          onChange={(e) =>
            setFilterPosition(e.target.value === "All" ? null : e.target.value)
          }
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="TSI">TSI</option>
          <option value="Constable">Constable</option>
          <option value="Home Guard">Home Guard</option>
        </select>
        <input
          type="text"
          placeholder="Filter by Name"
          value={filterName ?? ""}
          onChange={(e) =>
            setFilterName(e.target.value === "" ? null : e.target.value)
          }
          className="p-2 border rounded"
        />
      </div>
      {currentWeekSchedule && currentWeekSchedule.details.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Location</th>
                <th className="py-2 px-4 border-b">Shift</th>
              </tr>
            </thead>
            <tbody>
              {currentWeekSchedule.details.map((detail, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{detail.role}</td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={
                        editedDetails[`${currentWeek}-${index}`]?.name ??
                        detail.name
                      }
                      onChange={(e) =>
                        handleEdit(currentWeek, index, "name", e.target.value)
                      }
                      className="p-2 border rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={
                        editedDetails[`${currentWeek}-${index}`]?.location ??
                        detail.location
                      }
                      onChange={(e) =>
                        handleEdit(
                          currentWeek,
                          index,
                          "location",
                          e.target.value
                        )
                      }
                      className="p-2 border rounded w-full"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={
                        editedDetails[`${currentWeek}-${index}`]?.shift ??
                        detail.shift
                      }
                      onChange={(e) =>
                        handleEdit(currentWeek, index, "shift", e.target.value)
                      }
                      className="p-2 border rounded w-full"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            onClick={saveChanges}
          >
            Save Changes
          </button>
        </div>
      ) : (
        <p>No schedule details available for the current week.</p>
      )}
    </div>
  );
};

export default ScheduleForRotation;
