import * as dao from './index';

describe('Music player types', () => {
  it('should get all music player types from table', async () => {
    const noOfRows = 4;
    const questions = await dao.getMusicPlayerTypes();
    expect(questions).toHaveLength(noOfRows);
  });
});

describe('Show statuses', () => {
  it('should get all show statuses from table', async () => {
    const noOfRows = 3;
    const artists = await dao.getStatusesOfShow();
    expect(artists).toHaveLength(noOfRows);
  });
});

describe('Artists', () => {
  it('should get all artists from table', async () => {
    const noOfRows = 1;
    const questions = await dao.getArtists();
    expect(questions).toHaveLength(noOfRows);
  });
});

describe('Classic link insert, get, delete', () => {
  it('Classic link insert, get, delete', async () => {
    const artistId = 'beatles_1234';
    const classicLink: dao.ClassicLink = { 
      id: 1, 
      url: 'http://thebeatle.com', 
      title: 'The Beatles' 
    };
    const id: number = await dao.insertArtistClassicLink(classicLink, artistId);
    expect(id).toBeGreaterThan(0);
    const classics = await dao.getArtistClassicLinks(artistId);
    expect(classics.length).toBe(1);
    const row = classics[0];
    expect(row.url).toBe(classicLink.url);
    expect(row.title).toBe(classicLink.title);
    const delCount = await dao.deleteArtistClassicLink(id);
    expect(delCount).toBe(1);
    const rows = await dao.getArtistClassicLinks(artistId);
    expect(rows.length).toBe(0);
  });
});

describe('Music player link insert, get, delete', () => {
  it('Music player link insert, get, delete', async () => {
    const artistId = 'beatles_1234';
    const musicPlayerLink: dao.MusicPlayerLink = {
      id: 1, 
      url: 'http://spotify/beatles',
      music_play_type_id: 1
    };
    const id: number = await dao.insertArtistMusicPlayerLink(musicPlayerLink, artistId);
    expect(id).toBeGreaterThan(0);
    const musicPlayers = await dao.getArtistMusicPlayers(artistId);
    expect(musicPlayers.length).toBe(1);
    const row = musicPlayers[0];
    expect(row.url).toBe(musicPlayerLink.url);
    expect(row.music_play_type_id).toBe(musicPlayerLink.music_play_type_id);
    const delCount = await dao.deleteArtistMusicPlayerLink(id);
    expect(delCount).toBe(1);
    const rows = await dao.getArtistMusicPlayers(artistId);
    expect(rows.length).toBe(0);
  });
});

describe('Artist shows insert, get, delete', () => {
  it('Artist shows insert, get, delete', async () => {
    const artistId = 'beatles_1234';
    const artistShow: dao.ArtistShow = {
      id: 1,
      status_of_show_id: 1,
      date: '2021-02-01',
      venue: 'Sydney, Australia'
    };
    const id: number = await dao.insertArtistShow(artistShow, artistId);
    expect(id).toBeGreaterThan(0);
    const shows = await dao.getArtistShows(artistId);
    expect(shows.length).toBe(1);
    const row = shows[0];
    expect(row.status_of_show_id).toBe(artistShow.status_of_show_id);
    expect(row.date).toBe(artistShow.date);
    expect(row.venue).toBe(artistShow.venue);
    const delCount = await dao.deleteArtistShow(id);
    expect(delCount).toBe(1);
    const rows = await dao.getArtistShows(artistId);
    expect(rows.length).toBe(0);
  });
});

