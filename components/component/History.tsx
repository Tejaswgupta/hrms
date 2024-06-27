import React from 'react'
import { HistoryPersonnel } from './HistoryPersonnel'
import { HistoryLocation } from './HistoryLocation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const History = () => {
  return (
    <div>
         <Card id="history" className="shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="">History</CardTitle>
        </CardHeader>
        </Card>
        <HistoryPersonnel/>
        <HistoryLocation/>

    </div>
  )
}

