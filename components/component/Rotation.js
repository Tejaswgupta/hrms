// Sample data structures
const junctions = [
    { id: 'Vishwakarma Dwar Raatri', subJunctions: ['Vishwakarma Dwar Raatri'] },
    { id: 'Jajmau Chauraha', subJunctions: ['Bima Chauraha', 'J.K. Chauraha', 'Jajmau Vishwakarma Dwar'] },
    { id: 'Harjender Nagar', subJunctions: ['Harjender Nagar', 'Purana Thana Chakeri', 'Ma. Vi. Sabha Adhyaksh Aawas Mod Lal Bangla', 'Airforce Station'] },
    { id: 'Rama Devi Chauraha', subJunctions: ['HAL', 'Rama Devi Chauraha', 'Rama Devi Sabzi Mandi', 'E-Rickshaw Diversion (Rama Devi Ramp ke Peeche Lucknow Side)', 'E-Rickshaw Diversion (Fatehpur Side)', 'Jagdamba Petrol Pump', 'Shivkatra Mod'] },
    { id: 'Ahirwa', subJunctions: ['Airport Cut', 'Ahirwa'] },
    { id: 'Shyam Nagar Chauraha', subJunctions: ['Shyam Nagar Chauraha', 'Chhappan Bhog Chauraha', 'PAC Pul Chhappan Bhog Side', 'Dehli Sujanpur Cut (Hans Mandir)'] },
    { id: 'Manoj International / PAC Mod', subJunctions: ['Manoj International', 'COD Pul Tatmil Side'] },
    { id: 'Koyla Nagar', subJunctions: ['Koyla Nagar'] },
    { id: 'Rama Devi Ramp (Nawabasta Side Under Pass)', subJunctions: ['Rama Devi Ramp (Guru Har Rai Side)', 'Rama Devi Ramp (Mangla Vihar Side)'] },
    { id: 'Rocket Tiraha', subJunctions: ['Rocket Tiraha', '10 No. Canteen', 'Civil Aero Drum', 'Railway Station Gate No. 1 Side'] },
    { id: 'Mure Company Pul Cantt Side', subJunctions: ['Mure Company Pul Cantt Side'] },
    { id: 'Narauna Chauraha', subJunctions: ['Narauna Chauraha', 'Mure Company Pul Narauna Side'] },
    { id: 'Panchakki Chauraha', subJunctions: ['Panchakki Chauraha', 'Jhadibaba Padav'] },
    { id: 'Charles Chauraha', subJunctions: ['Phoolbagh Chauraha', 'Gilish Bazaar Cut', 'Charles Chauraha'] },
    { id: 'Kila Tiraha, Meghdoot', subJunctions: ['Meghdoot Tiraha'] },
    { id: 'Vyayamshala, Sarsaiya Ghat', subJunctions: ['Sarsaiya Ghat'] },
    { id: 'Police Line Main Gate, Bada Chauraha', subJunctions: ['Bada Chauraha', 'Kotwali Chauraha', 'Landmark', 'Bhargav Hospital Chauraha', 'RO Plant Sabzi Mandi Tiraha One-Way', 'Bada Chauraha se Kotwali Road', 'Ursala Hospital U-turn / Thaggu ke Laddu Road'] },
    { id: 'Chetna Chauraha', subJunctions: ['Chetna Chauraha One-Way', 'DM Karyalay Gate Samay Pratah: 09.00 se 17.00 Baje Tak', 'Kachhari Gate Tiraha'] },
    { id: 'DJ Gate', subJunctions: ['DJ Gate Samay Pratah: 09.00 se 17.00 Baje Tak'] },
    { id: 'Mahila Thana', subJunctions: ['Mahila Thana Pratah: 09.00 se 17.00 Baje Tak', 'Gora Kabristan ke Peeche', 'Mahila Thana se Gora Kabristan Peeche Gast Pratah: 09.00 se 17.00 Baje Tak', 'Mahila Thana se Lathakothi Gast Main Road Side'] },
    { id: 'Lathakothi', subJunctions: ['Lathakothi Pratah: 09.00 se 17.00 Baje Tak', 'DAV Tiraha Pratah: 09.00 se 17.00 Baje Tak'] },
    { id: 'Tikonia Park, Green Park', subJunctions: ['VIP Road', 'Green Park Chauraha', 'MG College', 'MG College, Police Office', 'Police Office', 'Police Office Gate One-Way Pratah: 09.00 se 17.00 Baje Tak', 'Police Office Parking Pratah: 09.00 se 17.00 Baje Tak'] },
    { id: 'Moolganj', subJunctions: ['Moolganj Chauraha U-turn', 'Kuli Bazaar U-turn Moolganj', 'Sharman Enterprises ke Samne Cut', 'Shyam Bihari Mishra Chowk U-turn', 'Ahimsa Chowk Moolganj', 'TSI Shri Rajkumar Singh Tomar 9532883366'] },
    { id: 'Carset', subJunctions: ['Carset / Parade Chauraha', 'Sadbhavna', 'Yatimkhana', 'Nai Sadak', 'Kitab Market / IMA'] },
    { id: 'Parade Chauraha', subJunctions: ['Naveen Market', 'Myor Mill Tiraha'] },
    { id: 'Circuit House', subJunctions: ['Jaipuria Crossing', 'Methodist School', 'Naya Pul Unnao Border', 'Circuit House Pratah: 09.00 se 17.00 Baje Tak'] },
    { id: 'Ghantaghar Chauraha', subJunctions: ['Ghantaghar Chauraha Din', 'Railway Station Gate No. 02', 'Ghantaghar Chauraha Raatri'] },
    { id: 'Express Road', subJunctions: ['Express Road', 'Hoolaganj', 'Shanidev Mandir Express Road', 'Malgodam', 'Koparganj'] }
];
  
const tsis = [
    { id: 'TSI1', name: 'TSI Shree Satendra Pal Singh', phone: '9305104313' },
    { id: 'TSI2', name: 'TSI Shree Bhagwat Yadav', phone: '7565034178' },
    { id: 'TSI3', name: 'TSI Dwarika Prasad', phone: '6261006874' },
    { id: 'TSI4', name: 'TSI Shree Akhilesh Kumar Dixit', phone: '9450589769' },
    { id: 'TSI5', name: 'TSI Shree Surendra Nath Tripathi', phone: '7307902048' },
    { id: 'TSI6', name: 'SI Shree Satyaprakash Singh', phone: '9450326545' },
    { id: 'TSI7', name: 'TSI Shree Ranvijay Singh', phone: '6394218570' },
    { id: 'TSI8', name: 'TSI Shree Brijesh Kumar Dwitiya', phone: '8273231434' },
    { id: 'TSI9', name: 'TSI Shree Rajkumar Singh Tomar', phone: '9532883366' },
    { id: 'TSI10', name: 'TSI Shree Ranu Singh', phone: '6394561273' },
    { id: 'TSI11', name: 'TSI Shree Pradeep Sharma', phone: '9910820092' }
  ];
  
  
const constables = [
  { id: 'C1', name: 'C 695 Pradeep Kumar', phone: '9129688785' },
  { id: 'C2', name: 'HC 1128 Sushil Kumar Saroj', phone: '9670740597' },
  { id: 'C3', name: 'HC 1058 Surya Bhan Singh', phone: '9450263947' },
  { id: 'C4', name: 'C 2512 Amit Kumar', phone: '9369991847' },
  { id: 'C5', name: 'C 103 AP Sher Singh', phone: '8899250944' },
  { id: 'C6', name: 'C 13 AP Ramesh Kumar', phone: '8935095795' },
  { id: 'C7', name: 'C 1359 Lavkesh', phone: '8419069892' },
  { id: 'C8', name: 'C 07 AP Prashant Singh Chauhan', phone: '8218029228' },
  { id: 'C9', name: 'C 170 AP Rahul', phone: '9793117098' },
  { id: 'C10', name: 'C 668 AP Jaivindra Singh', phone: '9634870425' },
  { id: 'C11', name: 'M 1555 Varsha', phone: '6397911855' },
  { id: 'C12', name: 'HC 1188 Home Singh', phone: '8923728633' },
  { id: 'C13', name: 'HC 1086 Awadhesh Kumar', phone: '8423290987' },
  { id: 'C14', name: 'C 117 AP Prince Kumar', phone: '9758717360' },
  { id: 'C15', name: 'C 546 AP Deepak Kumar', phone: '9084556195' },
  { id: 'C16', name: 'C 331 AP Aslam Ahmad', phone: '7007089823' },
  { id: 'C17', name: 'HC 2044 Neeraj Kumar', phone: '7017823233' },
  { id: 'C18', name: 'C 524 AP Kapil Kumar Shikanj', phone: '8057969699' },
  { id: 'C19', name: 'C 568 AP Lalit Kumar Patel', phone: '7800392587' },
  { id: 'C20', name: 'C 74 AP Rahul Kumar', phone: '7703806891' },
  { id: 'C21', name: 'C 652 Kaushal Vishwakarma', phone: '8924842511' },
  { id: 'C22', name: 'M 399 AP Kamal Singh', phone: '6398411631' },
  { id: 'C23', name: 'HC 235 Pramod Kumar', phone: '9415994854' },
  { id: 'C24', name: 'C 545 AP Deepak Kumar', phone: '6396357849' },
  { id: 'C25', name: 'C 247 Vikash Pal', phone: '8470852740' },
  { id: 'C26', name: 'C 58 AP Anlesh Yadav', phone: '8433036577' },
  { id: 'C27', name: 'C 454 Amitesh Kumar Saroj', phone: '8400694712' },
  { id: 'C28', name: 'C 107 AP Saurabh Vanrasiya', phone: '9026374149' },
  { id: 'C29', name: 'C 3681 Randhir Kumar', phone: '9454355799' },
  { id: 'C30', name: 'C 570 AP Subham Pal', phone: '9807897634' }
];
const homeGuards = [
    { id: 'HG1', name: 'HG 3731 Dharmendra' },
    { id: 'HG2', name: 'HG 3756 Pankaj' },
    { id: 'HG3', name: 'PRD 2002 Ajay' },
    { id: 'HG4', name: 'PRD 2028 Awadhesh' },
    { id: 'HG5', name: 'HG 1881 Hariprasad' },
    { id: 'HG6', name: 'HG 2441 Balveer' },
    { id: 'HG7', name: 'HG 2343 Ramkripal' },
    { id: 'HG8', name: 'MHG 1689 Urmila' },
    { id: 'HG9', name: 'HG 2726 Sunil' },
    { id: 'HG10', name: 'HG 1278 Yogendra Rana' },
    { id: 'HG11', name: 'HG 1457 Naresh' },
    { id: 'HG12', name: 'HG 1420 Shiv Kumar' },
    { id: 'HG13', name: 'HG 2797 Jayprakash' },
    { id: 'HG14', name: 'HG 3212 Ramvilas' },
    { id: 'HG15', name: 'HG 2495 Santosh Uttam' },
    { id: 'HG16', name: 'HG 0436 Arif' },
    { id: 'HG17', name: 'HG 2420 Virendra' },
    { id: 'HG18', name: 'HG 2443 Rajdev' },
    { id: 'HG19', name: 'HG 2140 Sarvesh' },
    { id: 'HG20', name: 'HG 2199 Subhash' },
    { id: 'HG21', name: 'HG 2737 Krishan Kumar' },
    { id: 'HG22', name: 'HG 2040 Lakshmiram' },
    { id: 'HG23', name: 'HG 1153 Ashok' },
    { id: 'HG24', name: 'HG 3679 Rajbahadur' },
    { id: 'HG25', name: 'HG 2736 Harikesh' },
    { id: 'HG26', name: 'HG 3780 Kalicharan' },
    { id: 'HG27', name: 'HG 2231 Yogendra' },
    { id: 'HG28', name: 'HG 2613 Annu' },
    { id: 'HG29', name: 'HG 2333 Rajveer Singh' },
    { id: 'HG30', name: 'MHG 4056 Rekha Tiwari' },
    { id: 'HG31', name: 'HG 2416 Rajendra' },
    { id: 'HG32', name: 'HG 2294 Jagat Narayan' },
    { id: 'HG33', name: 'HG 1929 Sukhveer' },
    { id: 'HG34', name: 'HG 2012 Suresh' },
    { id: 'HG35', name: 'HG 1828 Sharad' },
    { id: 'HG36', name: 'HG 2165 Kamal Kumar' },
    { id: 'HG37', name: 'HG 0955 Mahendra' },
    { id: 'HG38', name: 'HG 2837 Dinesh' },
    { id: 'HG39', name: 'HG 2734 Suryabhan' },
    { id: 'HG40', name: 'MHG 4098 Girjesh Kumari' },
    { id: 'HG41', name: 'HG 3072 Mahesh Singh' },
    { id: 'HG42', name: 'HG 3076 Vinod' },
    { id: 'HG43', name: 'HG 2467 Santosh' },
    { id: 'HG44', name: 'PRD 2031 Babushankar' },
    { id: 'HG45', name: 'MHG 1687 Radha' },
    { id: 'HG46', name: 'HG 2462 Shiv Kumar' },
    { id: 'HG47', name: 'HG 0120 Ashish' },
    { id: 'HG48', name: 'HG 2677 Ram Singh' },
    { id: 'HG49', name: 'HG 2727 Mohd Aslam' },
    { id: 'HG50', name: 'HG 0297 Brijesh Kumar' },
    { id: 'HG51', name: 'HG 2687 Badan Singh' },
    { id: 'HG52', name: 'HG 2563 Ramnaresh' },
    { id: 'HG53', name: 'HG 1017 Sanjay Kumar' },
    { id: 'HG54', name: 'HG 2387 Ravishankar' },
    { id: 'HG55', name: 'HG 3158 Akhilesh' },
    { id: 'HG56', name: 'MHG 1688 Savita' },
    { id: 'HG57', name: 'HG 2724 Naresh Kumar' },
    { id: 'HG58', name: 'HG 1796 Suresh' },
    { id: 'HG59', name: 'HG 3499 Jagdish' },
    { id: 'HG60', name: 'HG 3508 Dipnaryan' },
    { id: 'HG61', name: 'HG 0732 Jaygovind' },
    { id: 'HG62', name: 'HG 1831 Kamlesh' },
    { id: 'HG63', name: 'HG 3171 Shivgopal' },
    { id: 'HG64', name: 'HG 0846 Nirmal' },
    { id: 'HG65', name: 'HG 3030 Shailendra' },
    { id: 'HG66', name: 'HG 0260 Ramvilas' },
    { id: 'HG67', name: 'HG 3556 Ramprakash' },
    { id: 'HG68', name: 'HG 2325 Vinod' },
    { id: 'HG69', name: 'HG 2842 Nasir Ahmad' },
    { id: 'HG70', name: 'MHG 4030 Sonam Devi' },
    { id: 'HG71', name: 'HG 3544 Ramprakash' },
    { id: 'HG72', name: 'HG 2709 Sanjay' },
    { id: 'HG73', name: 'MHG 1636 Geeta' },
    { id: 'HG74', name: 'HG 3092 Rambabu' },
    { id: 'HG75', name: 'HG 1577 Anek' },
    { id: 'HG76', name: 'HG 2767 Ramsevak' },
    { id: 'HG77', name: 'HG 3144 Rishinath' },
    { id: 'HG78', name: 'HG 3250 Sunil Kumar' },
    { id: 'HG79', name: 'HG 2783 Vinay' },
    { id: 'HG80', name: 'HG 3786 Kamlesh Kumar' },
    { id: 'HG81', name: 'MHG 2965 Nisha Tiwari' },
    { id: 'HG82', name: 'HG 1472 Dinesh' },
    { id: 'HG83', name: 'HG 3635 Ramendra Kumar' },
    { id: 'HG84', name: 'MHG 2939 Shikha Mishra' },
    { id: 'HG85', name: 'HG 2470 Sadanand' },
    { id: 'HG86', name: 'HG 2570 Satyaprakash' },
    { id: 'HG87', name: 'HG 3653 Omnath' },
    { id: 'HG88', name: 'MHG 4085 Anarkali' },
    { id: 'HG89', name: 'HG 3746 Rajkumar' },
    { id: 'HG90', name: 'HG 3778 Kishan Lal' },
    { id: 'HG91', name: 'HG 1312 Vijayshankar' },
    { id: 'HG92', name: 'HG 0995 Shivkumar' },
    { id: 'HG93', name: 'HG 1029 Shyam Babu' },
    { id: 'HG94', name: 'HG 0514 Gyanendra Mishra' },
    { id: 'HG95', name: 'HG 3668 Sunil' },
    { id: 'HG96', name: 'HG 1065 Azad' },
    { id: 'HG97', name: 'MHG 1693 Shashi Devi' },
    { id: 'HG98', name: 'HG 1525 Vedprakash' },
    { id: 'HG99', name: 'HG 3928 Ashish Kumar' },
    { id: 'HG100', name: 'MHG 4034 Sneha Saini' },
    { id: 'HG101', name: 'HG 1541 Santosh' },
    { id: 'HG102', name: 'HG 0138 Ramgopal' },
    { id: 'HG103', name: 'HG 0747 Kailash' },
    { id: 'HG104', name: 'HG 3817 Arun' },
    { id: 'HG105', name: 'MHG 4011 Veena' },
    { id: 'HG106', name: 'HG 0164 Pradeep' },
    { id: 'HG107', name: 'HG 1411 Sunil' },
    { id: 'HG108', name: 'MHG 4010 Manjulata' },
    { id: 'HG109', name: 'HG 3690 Vinod' },
    { id: 'HG110', name: 'HG 3823 Mukesh' },
    { id: 'HG111', name: 'HG 2185 Mahavir' },
    { id: 'HG112', name: 'HG 1908 Ram Singh' },
    { id: 'HG113', name: 'HG 2263 Rammilan' },
    { id: 'HG114', name: 'HG 1575 Ramraj' },
    { id: 'HG115', name: 'HG 3920 Ravindra Pratap' },
    { id: 'HG116', name: 'HG 2629 Yadunandan' },
    { id: 'HG117', name: 'HG 2775 Sonelal' },
    { id: 'HG118', name: 'HG 1261 Jayprakash' },
    { id: 'HG119', name: 'HG 2733 Raghavendra' },
    { id: 'HG120', name: 'HG 3317 Pranveer' },
    { id: 'HG121', name: 'HG 2873 Arvind Kumar' },
    { id: 'HG122', name: 'HG 2670 Shravan' },
    { id: 'HG123', name: 'HG 3219 Yatendra' },
    { id: 'HG124', name: 'HG 3863 Amit' },
    { id: 'HG125', name: 'MHG 1633 Sunita' },
    { id: 'HG126', name: 'HG 2330 Ramchandra' },
    { id: 'HG127', name: 'HG 1298 Umashankar' }
  ];
    

  // Function to rotate personnel
  function rotatePersonnel(weekNumber) {
    const numSubJunctions = junctions.reduce((acc, junction) => acc + junction.subJunctions.length, 0);
    
    // Rotate TSI
    tsis.forEach((tsi, index) => {
      const tsiJunction = junctions[index % junctions.length];
      console.log(`Week ${weekNumber}: TSI ${tsi.name} is at ${tsiJunction.id}`);
    });
    
    // Rotate constables and home guards across sub-junctions
    let personnelIndex = 0;
    junctions.forEach((junction) => {
      junction.subJunctions.forEach((subJunction, subIndex) => {
        // Calculate the index of the constable and home guard for this sub-junction
        const constableIndex = (weekNumber + subIndex) % constables.length;
        const homeGuardIndex = (weekNumber + subIndex) % homeGuards.length;
        
        // Assign constables and home guards
        const constable = constables[constableIndex];
        const homeGuard = homeGuards[homeGuardIndex];
        console.log(`Week ${weekNumber}: Constable ${constable.name} is at ${subJunction}`);
        console.log(`Week ${weekNumber}: Home Guard ${homeGuard.name} is at ${subJunction}`);
        
        personnelIndex++;
      });
    });
  }
  
  // Example usage
  for (let week = 1; week <= 4; week++) {
    rotatePersonnel(week);
    console.log('----------------------------');
  }