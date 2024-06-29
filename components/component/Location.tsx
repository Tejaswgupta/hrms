import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { CommandMenu } from "./CommandMenu";
import { supabase } from "./supabase";

const Location: React.FC = () => {
    const Map = useMemo(() => dynamic(
        () => import('./Map'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])
    const [schedule, setSchedule] = useState<any[]>([]);
    const [filterPosition, setFilterPosition] = useState<string | null>(null);
    const [filterName, setFilterName] = useState<string | null>(null);
    const [filterLocation, setFilterLocation] = useState<string | null>(null);
    const [commandMenuOpen, setCommandMenuOpen] = useState<boolean>(false);
    const [filterMenuOpen, setFilterMenuOpen] = useState<boolean>(false);

    async function getSchedule() {
        const { data: scheduleData, error } = await supabase
            .from("assignments")
            .select(
                "personnel(name,role,location)"
            )
            ;
        if (error) {
            console.error("Error fetching schedule:", error);
        } else {
            console.log("schedule", scheduleData);
            setSchedule(scheduleData);
        }
    }

    useEffect(() => {
        getSchedule();
    }, []);

    const filteredSchedule = schedule.filter((detail) => {
        const matchesPosition =
            !filterPosition ||
            filterPosition === "All" ||
            detail.personnel.role === filterPosition;
        const matchesName =
            !filterName ||
            detail.personnel.name.toLowerCase().includes(filterName.toLowerCase());
        const matchesLocation =
            !filterLocation ||
            detail.junctions?.name
                .toLowerCase()
                .includes(filterLocation.toLowerCase()) ||
            detail.sub_junctions?.name
                .toLowerCase()
                .includes(filterLocation.toLowerCase());

        return matchesPosition && matchesName && matchesLocation;
    });

    const handleSelection = async (selectedValue: string) => {
        if (filterMenuOpen) {
            setFilterLocation(selectedValue);
            setFilterMenuOpen(false);
        }
    };

    return (
        <div className="py-6">
            <Card id="rotation-schedule" className="mt-10">
                <CardHeader>
                    <CardTitle>Live Location</CardTitle>
                </CardHeader>
                <CardContent>
                    <CommandMenu
                        open={commandMenuOpen}
                        setOpen={setCommandMenuOpen}
                        onSelect={handleSelection}
                        showOnlyjunction={true}
                        showOnlySubjunction={true}
                    />
                    <CommandMenu
                        open={filterMenuOpen}
                        setOpen={setFilterMenuOpen}
                        onSelect={handleSelection}
                        showOnlyjunction={true}
                        showOnlySubjunction={true}
                    />
                    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-4">
                        <label
                            htmlFor="filterPosition"
                            className="font-semibold mb-2 md:mb-0"
                        >
                            Filter by Position:
                        </label>
                        <select
                            id="filterPosition"
                            value={filterPosition ?? "All"}
                            onChange={(e) =>
                                setFilterPosition(
                                    e.target.value === "All" ? null : e.target.value
                                )
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
                    <div className="bg-white-700 mx-auto my-5 h-[580px]">
                        <Map personnel={filteredSchedule.map((detail) => detail.personnel)} />
                    </div>
                </CardContent>
            </Card>
        </div >
    );
};

export default Location;
