"use client";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export function CommandMenu({ open, setOpen, onSelect , showOnlyjunction, showOnlySubjunction}) {
  const [junctions, setJunctions] = useState([]);
  const [subJunctions, setSubJunctions] = useState([]);

  useEffect(() => {
    fetchJunctions();
    fetchSubJunctions();
  }, []);

  async function fetchJunctions() {
    const { data, error } = await supabase.from("junctions").select("*");

    if (error) {
      console.error("Error fetching junctions:", error);
    } else {
      console.log("junctions",data);
      setJunctions(data.map((junction) => junction));
      console.log("junctions2",junctions);
    }
  }

  async function fetchSubJunctions() {
    const { data, error } = await supabase.from("sub_junctions").select("*");

    if (error) {
      console.error("Error fetching subjunctions:", error);
    } else {
      console.log("subjunctions",data);
      setSubJunctions(data.map((subJunction) => subJunction));
      console.log("sub",subJunctions);
    }
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type Location Name" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {showOnlyjunction && junctions.map((junction, index) => (
            <CommandItem
              key={`junction-${index}`}
              onSelect={() => onSelect(junction.name)}
            >
            {junction.name} - {junction.num_tsi}
            </CommandItem>
          ))}
          {showOnlySubjunction && subJunctions.map((subJunction, index) => (
            <CommandItem
              key={`subjunction-${index}`}
              onSelect={() => onSelect(subJunction.name)}
            >
              {subJunction.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
