import * as artistLinkTypes from './artistLinkTypes'

describe('Music player types', () => {
  it('get Music player types', async () => {
    const size = 3;
    const types: Map<number, string> = await artistLinkTypes.getMusicPlayerTypes();
    expect(types.size).toEqual(size);
    const ids: Map<string, number> = await artistLinkTypes.getMusicPlayerTypeIds();
    expect(ids.size).toEqual(size);
  });
});

describe('Statuses of show', () => {
  it('get the right statuses of show', async () => {
    const size = 3;
    const types: Map<number, string> = await artistLinkTypes.getStatusesOfShow();
    expect(types.size).toEqual(size);
    const ids: Map<string, number> = await artistLinkTypes.getStatusIdsOfShow();
    expect(ids.size).toEqual(size);
  });
});