import { ContributeProject } from "./contributeProjectType";
import { User } from "./userType";

type Field = "melody" | "instrument" | "lyric";

type Genre =
  | "Acoustic"
  | "Blues"
  | "Classic"
  | "Country"
  | "Electronic"
  | "Fork"
  | "Funk"
  | "Hiphop"
  | "Indie"
  | "Jazz"
  | "Latin"
  | "Pop"
  | "Reggae"
  | "Retro"
  | "Rock"
  | "Soul"
  | "R&B"
  | "Balad"
  | "Funk";

type Mood =
  | "Uplifting"
  | "Epic"
  | "Powerful"
  | "Happy"
  | "Hopeful"
  | "Love"
  | "Playful"
  | "Groovy"
  | "Sad"
  | "Serious"
  | "Dramatic"
  | "Dark";

type RequestProjectType = {
  id: number;
  title: string;
  content?: string;
  fields: Array<Field>;
  genres: Array<Genre>;
  moods: Array<Mood>;
  lyrics?: string;
  instrument?: string;
  melody?: string;
  contributeList?: Array<User & ContributeProject>;
};

export { Field, Genre, Mood, RequestProjectType };
