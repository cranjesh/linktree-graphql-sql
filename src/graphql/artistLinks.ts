import {
  QueryArtistLinksArgs,
  ClassicLinkType,
  MusicPlayerLinkType,
  ShowsLinkType,
  MutationCreateClassicLinkArgs,
  MutationCreateMusicPlayerLinkArgs,
  MutationCreateShowLinkArgs,
  ArtistLinkTypes,
  MusicPlayerLinkInput,
  ClassicLinkInput,
  ShowsLinkInput
} from './graphql-types';

const graphqlFields = require('graphql-fields');
import * as serv from '../service';
import * as artistLinkTypes from './artistLinkTypes';

const artistLinksResolve = async (topLevelFields: string[], artistId: string): Promise<ArtistLinkTypes> => {
  const getArtistClassicLinks = async (): Promise<ClassicLinkType[]> => {
    const classicsServ = await serv.getArtistClassicLinks(artistId);
    const classics: ClassicLinkType[] = classicsServ.map(classic => ({ title: classic.title, url: classic.url }));
    return classics;
  };
  const getArtistMusicPlayers = async (): Promise<MusicPlayerLinkType[]> => {
    const playersServ = await serv.getArtistMusicPlayers(artistId);
    return Promise.all(
      playersServ.map(async player =>
      (
        {
          playerType: await artistLinkTypes.getMusicPlayerType(player.music_play_type_id),
          url: player.url
        }
      )
      ));
  };
  const getArtistShowLinks = async (): Promise<ShowsLinkType[]> => {
    const showsServ = await serv.getArtistShows(artistId);
    return Promise.all(
      showsServ.map(async show =>
      (
        {
          status: await artistLinkTypes.getStatusOfShow(show.status_of_show_id),
          date: show.date,
          venue: show.venue
        }
      )
      )
    );
  };

  const result: ArtistLinkTypes = {
    classics: [],
    musicPlayers: [],
    shows: []
  }
  for (const field of topLevelFields) {
    if (field === 'classics')
      result.classics = await getArtistClassicLinks();
    else if (field === 'musicPlayers')
      result.musicPlayers = await getArtistMusicPlayers();
    else if (field === 'shows')
      result.shows = await getArtistShowLinks();
  }
  console.log('result %j', result)
  return result;
};

const createClassicLinkResolve = async (classicLink: ClassicLinkInput, artistId: string): Promise<number> => 
  serv.createArtistClassicLink(
  {
    title: classicLink.title,
    url: classicLink.url,
    id: 0
  }, artistId);

export const createMusicPlayerLinkResolve = async (musicPlayerLink: MusicPlayerLinkInput, artistId: string): Promise<number> => 
  serv.createArtistMusicPlayerLink({
    music_play_type_id: await artistLinkTypes.getMusicPlayerId(musicPlayerLink.playerType), 
    url: musicPlayerLink.url,
    id: 0
  }, artistId);

const createShowLinkResolve = async (showLink: ShowsLinkInput, artistId: string): Promise<number> => 
  serv.createArtistShowLink({
  date: showLink.date,
  venue: showLink.venue,
  status_of_show_id: await artistLinkTypes.getShowStatusId(showLink.status),
  id: 0
}, artistId);
// export const artistLinksResolvers = {
//   Query: {
//     async artistLinks(_: any, { artistId }: QueryArtistLinksArgs): Promise<ArtistLinkTypes> {
//       const classics: ClassicLinkType[] = [{
//         title: '48H',
//         url: ''
//       }, {
//         title: '96H',
//         url: ''
//       }];
//       const musicPlayers: MusicPlayerLinkType[] = [{
//         url: 'https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2',
//         playerType: MusicPlayerType.Spotify
//       }, {
//         url: 'https://music.apple.com/au/artist/the-beatles/136975',
//         playerType: MusicPlayerType.AppleMusic
//       }, {
//         url: 'https://soundcloud.com/thebeatles',
//         playerType: MusicPlayerType.SoundCloud
//       }];
//       const shows: ShowsLinkType[] = [{
//         date: '01 Feb 2022',
//         status: StatusOfShow.SoldOut,
//         venue: 'Sydney, Australia'
//       }, {
//         date: '01 Jan 2022',
//         status: StatusOfShow.NotOnSale,
//         venue: 'New York, USA'
//       },
//       {
//         date: '15 Feb 2022',
//         status: StatusOfShow.OnSale,
//         venue: 'Melbourne, Australia'
//       }];
//       return { classics, musicPlayers, shows };
//     }
//   }
// };

export const artistLinksResolvers = {
  Query: {
    async artistLinks(_root: any, { artistId }: QueryArtistLinksArgs, _context: any, _info: any): Promise<ArtistLinkTypes> {
      const topLevelFields: string[] = Object.keys(graphqlFields(_info));
      return artistLinksResolve(topLevelFields, artistId);
    }
  },
  Mutation: {
    async createClassicLink(_root: any, { classicLink, artistId }: MutationCreateClassicLinkArgs): Promise<number> {
      return createClassicLinkResolve(classicLink, artistId );
    },
    async createMusicPlayerLink(_root: any, { musicPlayerLink, artistId }: MutationCreateMusicPlayerLinkArgs): Promise<number> {
      return createMusicPlayerLinkResolve(musicPlayerLink, artistId );
    },
    async createShowLink(_root: any, { showLink, artistId }: MutationCreateShowLinkArgs): Promise<number> {
      return createShowLinkResolve(showLink, artistId );
    }
  }
};