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

export function EmployeeCmdk({ open, setOpen, onSelect }) {
  const [personnel, setPersonnel] = useState([]);

  useEffect(() => {
    fetchPersonnel();
  }, []);

  async function fetchPersonnel() {
    const { data, error } = await supabase.from("personnel").select("name");

    if (error) {
      console.error("Error fetching personnel:", error);
    } else {
      setPersonnel(data.map((person) => person.name));
    }
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type Employee Name" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {personnel.map((person, index) => (
            <CommandItem
              key={`personnel-${index}`}
              onSelect={() => onSelect(person)}
            >
              {person}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

