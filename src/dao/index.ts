import knexInstance from '../config/knex';

const env = process.env.NODE_ENV || 'local';

export interface Artist {
  id: string;
  name: string;
  imageurl: string;
}

export const getArtists = async (): Promise<Artist[]> =>
  await knexInstance<Artist>('artist')
    .select('id')
    .select('name')
    .select('imageurl');

export interface MusicPlayerType {
  id: string;
  name: string;
}

export const getMusicPlayerTypes = async (): Promise<MusicPlayerType[]> =>
  await knexInstance<MusicPlayerType>('music_player_type')
    .select('id')
    .select('name');

export interface StatusOfShow {
  id: string;
  status: string;
}

export const getStatusesOfShow = async (): Promise<StatusOfShow[]> =>
  await knexInstance<StatusOfShow>('status_of_show')
    .select('id')
    .select('status');

export interface ClassicLink {
  id: number;
  title: string;
  url: string;
}

export const getArtistClassicLinks = async (
  artistId: string
): Promise<ClassicLink[]> => {
  const query = `SELECT acl.artistid, acl.id, acl.title, acl.url
  FROM artist
  INNER JOIN artist_classic_link acl
  ON artist.id = acl.artistid
  WHERE acl.artistid = ?
  ORDER BY acl.created_time DESC`;
  const results: ClassicLink[] = await knexInstance.raw(query, [artistId]);
  return results;
};

export interface MusicPlayerLink {
  id: number;
  music_play_type_id: number;
  url: string;
}

export const getArtistMusicPlayers = async (
  artistId: string
): Promise<MusicPlayerLink[]> => {
  const query = `SELECT amp.artistid, amp.id, amp.music_play_type_id, amp.url
  FROM artist
  INNER JOIN artist_music_player amp
  ON artist.id = amp.artistid
  WHERE amp.artistid = ?
  ORDER BY amp.created_time DESC`;
  const results: MusicPlayerLink[] = await knexInstance.raw(query, [artistId]);
  return results;
};

export interface ArtistShow {
  id: number;
  status_of_show_id: number;
  date: string;
  venue: string;
}

export const getArtistShows = async (
  artistId: string
): Promise<ArtistShow[]> => {
  const query = `SELECT ash.artistid, ash.id, ash.status_of_show_id, ash.status_of_show_id, ash.date, ash.venue
  FROM artist
  INNER JOIN artist_shows ash
  ON artist.id = ash.artistid
  WHERE ash.artistid = ?
  ORDER BY ash.created_time DESC`;
  const results: ArtistShow[] = await knexInstance.raw(query, [artistId]);
  return results;
};

export const insertArtistClassicLink = async (
  classicLink: ClassicLink,
  artistId: string
): Promise<number> => {
  if (env === 'local')
    await knexInstance.raw("PRAGMA foreign_keys = ON;")
  const ids: any[] = await knexInstance('artist_classic_link').insert(
    {
      artistid: artistId,
      title: classicLink.title,
      url: classicLink.url
    }
  );
  return ids[0];
};

export const insertArtistMusicPlayerLink = async (
  musicPlayerLink: MusicPlayerLink,
  artistId: string
): Promise<number> => {
  const ids: any[] = await knexInstance('artist_music_player').insert(
    {
      artistid: artistId,
      music_play_type_id: musicPlayerLink.music_play_type_id,
      url: musicPlayerLink.url
    }
  );
  return ids[0];
};

export const insertArtistShow = async (
  artistShow: ArtistShow,
  artistId: string
): Promise<number> => {
  const ids: any[] = await knexInstance('artist_shows').insert(
    {
      artistid: artistId,
      status_of_show_id: artistShow.status_of_show_id,
      date: artistShow.date,
      venue: artistShow.venue
    }
  );
  return ids[0];
};

export const deleteArtistClassicLink = async (
  classicLinkId: number
): Promise<number> =>
  await knexInstance('artist_classic_link')
    .where('id', classicLinkId)
    .del();

export const deleteArtistMusicPlayerLink = async (
  musicPlayerLinkId: number): Promise<number> =>
  await knexInstance('artist_music_player')
    .where('id', musicPlayerLinkId)
    .del();


export const deleteArtistShow = async (
  artistShowId: number): Promise<number> =>
  await knexInstance('artist_shows')
    .where('id', artistShowId)
    .del();
