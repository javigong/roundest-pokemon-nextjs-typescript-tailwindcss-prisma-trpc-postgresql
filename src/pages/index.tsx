/* eslint-disable @next/next/no-img-element */
import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import Image from "next/image";
import type React from "react";
import { useState } from "react";
import { inferQueryResponse } from "./api/trpc/[trpc]";

const btn =
  "inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

const Home = () => {
  const [ids, updateIds] = useState(getOptionsForVote());
  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

  const voteMutation = trpc.useMutation(["cast-vote"]);

  const voteForRoundest = (selected: number) => {
    if (selected === first) {
      voteMutation.mutate({ votedFor: first, votedAgainst: second });
    } else {
      voteMutation.mutate({ votedFor: second, votedAgainst: first });
    }
    // todo: fire mutation to persist changes
    updateIds(getOptionsForVote());
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center pb-2">
      <div className="text-2xl text-center">Which Pokémon is roundest?</div>
      <div className="p-2" />
      {!firstPokemon.isLoading &&
        firstPokemon.data &&
        !secondPokemon.isLoading &&
        secondPokemon.data && (
          <>
            <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
              <PokemonListing
                pokemon={firstPokemon.data}
                vote={() => voteForRoundest(first)}
              />
              <div className="p-8">Vs</div>
              <PokemonListing
                pokemon={secondPokemon.data}
                vote={() => voteForRoundest(second)}
              />
              <div className="p-2" />
            </div>
            <div className="absolute bottom-0 w-full text-center">
              <a href="https://github.com/javigong/roundest-pokemon-nextjs-typescript-tailwindcss-prisma-trpc-postgresql">Javier Gongora © 2022</a>
            </div>
          </>
        )}
    </div>
  );
};

export default Home;

type PokemonFromServer = inferQueryResponse<"get-pokemon-by-id">;

const PokemonListing: React.FC<{
  pokemon: PokemonFromServer;
  vote: () => void;
}> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={props.pokemon.spriteUrl }
        width={256}
        height={256}
        className="w-64 h-64"
        alt="first pokemon"
      />
      <div className="text-xl text-center capitalize mt-[-2rem]">
        {props.pokemon.name}
      </div>
      <button className={btn} onClick={() => props.vote()}>
        Rounder
      </button>
    </div>
  );
};
