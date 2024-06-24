"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function CommandMenu({ open, setOpen, onSelect }) {
  const [junctions, setJunctions] = useState([]);
  const [subJunctions, setSubJunctions] = useState([]);

  useEffect(() => {
    fetchJunctions();
    fetchSubJunctions();
  }, []);

  async function fetchJunctions() {
    const { data, error } = await supabase.from("junctions").select("name");

    if (error) {
      console.error("Error fetching junctions:", error);
    } else {
      setJunctions(data.map((junction) => junction.name));
    }
  }

  async function fetchSubJunctions() {
    const { data, error } = await supabase.from("sub_junctions").select("name");

    if (error) {
      console.error("Error fetching subjunctions:", error);
    } else {
      setSubJunctions(data.map((subJunction) => subJunction.name));
    }
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type Location Name" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {junctions.map((junction, index) => (
            <CommandItem
              key={`junction-${index}`}
              onSelect={() => onSelect(junction)}
            >
              {junction}
            </CommandItem>
          ))}
          {subJunctions.map((subJunction, index) => (
            <CommandItem
              key={`subjunction-${index}`}
              onSelect={() => onSelect(subJunction)}
            >
              {subJunction}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
