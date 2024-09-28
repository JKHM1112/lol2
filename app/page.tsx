import Games from "./games/page";
import RiotPatchNotes from "./components/riotPatchNotes";
import CharSearch from "./charSearch/page";

export default async function Home() {
  return (
    <div className="flex flex-col justify-start items-center min-w-[1200px] min-h-[1000px] bg-gray-100">
      <div className="searchLogo flex items-center justify-center mt-8 mb-6">
        <span className="lolL">LOL</span>
        <span className="recordL">RECORD</span>
      </div>
      <Games />
      <div className="flex">
        <RiotPatchNotes />
      </div>
    </div>
  );
}
