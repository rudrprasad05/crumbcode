"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCake } from "@/context/CakeContext";
import React from "react";
import { DeleteCake } from "./DeleteCake";
import { DateTime } from "luxon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SideBarConfigTab() {
  const { cake, updateCakeValues } = useCake();

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // set to false for 24h format
  };

  const parseDate = (
    options: Intl.DateTimeFormatOptions,
    date?: string
  ): string => {
    const dateFormatOptions: Intl.DateTimeFormatOptions = {
      ...options,
      timeZone: "Pacific/Auckland", // GMT+12 (handles daylight saving too)
    };

    if (!date || date.trim().length === 0) {
      return new Intl.DateTimeFormat(undefined, dateFormatOptions).format(
        new Date()
      );
    }

    const parsedDate = new Date(date);
    return new Intl.DateTimeFormat(undefined, dateFormatOptions).format(
      parsedDate
    );
  };

  return (
    <div className="grow">
      <div className="space-y-6 w-full py-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="co">Created On</Label>
          <Input
            id="co"
            disabled
            value={parseDate(dateFormatOptions, cake.createdOn)}
            onChange={(e) => updateCakeValues("name", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="uo">Updated On</Label>
          <Input
            id="uo"
            disabled
            value={parseDate(dateFormatOptions, cake.updatedOn)}
            onChange={(e) => updateCakeValues("name", e.target.value)}
          />
        </div>

        <Card className="flex flex-col border border-dashed border-rose-400 rounded-lg">
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <div>
              <Label>Delete Cake</Label>
              <CardDescription>
                This action is reversable but will remove the item from user
                view
              </CardDescription>
            </div>
            <DeleteCake uuid={cake.uuid as string} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
