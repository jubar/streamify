import TopSongItem from "../ui/top-song-item";

export default function TopSongs() {
  return (
    <div className="flex flex-col gap-6 mt-4">
      <h1 className="text-xl font-bold dark:text-slate-100">Top 5 songs</h1>
      <TopSongItem
        song="La salvación"
        artist="Arde Bogota"
        albumCover="https://i.scdn.co/image/ab67616d00001e02f877753076ae48397c1a789f"
        isVerified
        listens={1780536}
      />
      <TopSongItem
        song="Nada que perder"
        artist="Robe"
        albumCover="https://i.scdn.co/image/ab67616d00001e025043d72bbdd36cbee49af7c5"
        isVerified
        listens={1670986}
      />

      <TopSongItem
        song="Hacha"
        artist="Rey Toro"
        albumCover="https://i.scdn.co/image/ab67616d00001e024aa4ee69ce84f959ce3636d0"
        isVerified
        listens={1660131}
      />

      <TopSongItem
        song="Highway to hell"
        artist="AC/DC"
        albumCover="https://i.scdn.co/image/ab67616d00001e0251c02a77d09dfcd53c8676d0"
        isVerified
        listens={1600982}
      />

      <TopSongItem
        song="Amor de Verano"
        artist="Marlena"
        albumCover="https://i.scdn.co/image/ab67616d00001e02c0e16fbf934a140be545a497"
        isVerified
        listens={14281847}
      />
    </div>
  );
}
