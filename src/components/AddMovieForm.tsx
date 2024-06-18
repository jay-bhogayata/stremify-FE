"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const MovieSchema = z.object({
  title: z.string().min(1, {
    message: "Title must be at least 1 character long",
  }),
  releaseYear: z.string().min(4, {
    message: "Release year must be at least 4 characters long",
  }),
  duration: z.string().min(1, {
    message: "Duration must be at least 1 character long",
  }),
  synopsis: z.string().min(10, {
    message: "Synopsis must be at least 10 characters long",
  }),
  ageRating: z.string().min(1, {
    message: "Age rating must be at least 1 character long",
  }),
  genre: z.string().min(1, {
    message: "Genre must be at least 1 character long",
  }),
  actors: z.string().min(3, {
    message: "Actors must be at least 3 characters long",
  }),
  warnings: z.string().min(3, {
    message: "Warnings must be at least 3 characters long",
  }),
});

export type MovieFormData = z.infer<typeof MovieSchema>;

type MovieFormProps = {
  onSubmit: (data: MovieFormData) => void;
};

export function MovieForm({ onSubmit }: MovieFormProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MovieFormData>({
    resolver: zodResolver(MovieSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4  ">
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input {...field} type="text" placeholder="Movie Title" required />
          )}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{String(errors.title.message)}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="releaseYear">Release Year</Label>
        <Controller
          name="releaseYear"
          control={control}
          defaultValue={"2024"}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              placeholder="Release Year"
              required
            />
          )}
        />
        {errors.releaseYear && (
          <p className="text-red-500 text-sm">
            {String(errors.releaseYear.message)}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="duration">Duration (minutes)</Label>
        <Controller
          name="duration"
          control={control}
          defaultValue={"90"}
          render={({ field }) => (
            <Input {...field} type="number" placeholder="Duration" required />
          )}
        />
        {errors.duration && (
          <p className="text-red-500 text-sm">
            {String(errors.duration.message)}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="synopsis">Synopsis</Label>
        <Controller
          name="synopsis"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input {...field} type="text" placeholder="Synopsis" required />
          )}
        />
        {errors.synopsis && (
          <p className="text-red-500 text-sm">
            {String(errors.synopsis.message)}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="ageRating">Age Rating</Label>
        <Controller
          name="ageRating"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input {...field} type="text" placeholder="Age Rating" required />
          )}
        />
        {errors.ageRating && (
          <p className="text-red-500 text-sm">
            {String(errors.ageRating.message)}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="genre">Genre</Label>
        <Controller
          name="genre"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input {...field} type="text" placeholder="Genre" required />
          )}
        />
        {errors.genre && (
          <p className="text-red-500 text-sm">{String(errors.genre.message)}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="actors">Actors</Label>
        <Controller
          name="actors"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input {...field} type="text" placeholder="Actors" required />
          )}
        />
        {errors.actors && (
          <p className="text-red-500 text-sm">
            {String(errors.actors.message)}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="warnings">Warnings</Label>
        <Controller
          name="warnings"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input {...field} type="text" placeholder="Warnings" required />
          )}
        />
        {errors.warnings && (
          <p className="text-red-500 text-sm">
            {String(errors.warnings.message)}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full font-semibold text-md">
        Submit
      </Button>
    </form>
  );
}

// Top Gun: Maverick
// 2020
// 120
// After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.
// PG-13
// Action , Drama
// Tom Cruise, Jennifer Connelly, Val Kilmer
// Language, Violence
