import * as dao from '../dao';

export const getMusicPlayerTypes = async (): Promise<dao.MusicPlayerType[]> => dao.getMusicPlayerTypes();

export const getStatusesOfShow = async (): Promise<dao.StatusOfShow[]> => dao.getStatusesOfShow();

export const getArtists = async (): Promise<dao.Artist[]> => dao.getArtists();

export const getArtistClassicLinks = async (
  artistId: string
): Promise<dao.ClassicLink[]> => dao.getArtistClassicLinks(artistId);

export const getArtistMusicPlayers = async (
  artistId: string
): Promise<dao.MusicPlayerLink[]> => dao.getArtistMusicPlayers(artistId);

export const getArtistShows = async (
  artistId: string
): Promise<dao.ArtistShow[]> => dao.getArtistShows(artistId);

export const createArtistClassicLink = async (
  classicLink: dao.ClassicLink,
  artistId: string
): Promise<number> => dao.insertArtistClassicLink(classicLink, artistId);

export const createArtistMusicPlayerLink = async (
  musicPlayerLink: dao.MusicPlayerLink,
  artistId: string
): Promise<number> => dao.insertArtistMusicPlayerLink(musicPlayerLink, artistId);

export const createArtistShowLink = async (
  artistShow: dao.ArtistShow,
  artistId: string
): Promise<number> => dao.insertArtistShow(artistShow, artistId);