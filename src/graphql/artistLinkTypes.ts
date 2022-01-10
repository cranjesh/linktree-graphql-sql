import {
    MusicPlayerType,
    StatusOfShow
} from './graphql-types';

import * as dao from '../dao';
import * as serv from '../service';

let musicPlayerTypes: Map<number, MusicPlayerType>;
let showStatuses: Map<number, StatusOfShow>;
let musicPlayerTypeIds: Map<MusicPlayerType, number>;
let showStatusIds: Map<StatusOfShow, number>;

export const getMusicPlayerTypes = async (): Promise<Map<number, MusicPlayerType>> => {
    if (musicPlayerTypes) return musicPlayerTypes;
    const typesDao: dao.MusicPlayerType[] = await serv.getMusicPlayerTypes();
    const typesMap: Map<number, MusicPlayerType> = typesDao.reduce((accum, type) => {
        if (type.name === 'SPOTIFY') accum.set(type.id, MusicPlayerType.Spotify);
        else if (type.name === 'APPLE_MUSIC') accum.set(type.id, MusicPlayerType.AppleMusic);
        else if (type.name === 'SOUND_CLOUD') accum.set(type.id, MusicPlayerType.SoundCloud);
        return accum;
    }, new Map());
    return typesMap;
}

export const getMusicPlayerType = async (typeId: number): Promise<MusicPlayerType> => {
    const type: MusicPlayerType | undefined = (await getMusicPlayerTypes()).get(typeId);
    return type || MusicPlayerType.AppleMusic;
};

export const getMusicPlayerTypeIds = async (): Promise<Map<MusicPlayerType, number>> => {
    if (musicPlayerTypes) return musicPlayerTypeIds;
    const typesDao: dao.MusicPlayerType[] = await serv.getMusicPlayerTypes();
    const idsMap: Map<MusicPlayerType, number> = typesDao.reduce((accum, type) => {
        if (type.name === 'SPOTIFY') accum.set(MusicPlayerType.Spotify, type.id);
        else if (type.name === 'APPLE_MUSIC') accum.set(MusicPlayerType.AppleMusic, type.id);
        else if (type.name === 'SOUND_CLOUD') accum.set(MusicPlayerType.SoundCloud, type.id);
        return accum;
    }, new Map());
    return idsMap;
}

export const getMusicPlayerId = async (type: MusicPlayerType): Promise<number> => {
    const id: number | undefined = (await getMusicPlayerTypeIds()).get(type);
    return id || 0;
};

export const getStatusesOfShow = async (): Promise<Map<number, StatusOfShow>> => {
    if (showStatuses) return showStatuses;
    const statusesDao: dao.StatusOfShow[] = await serv.getStatusesOfShow();
    const statusesMap: Map<number, StatusOfShow> = statusesDao.reduce((accum, type) => {
        if (type.status === 'SOLD_OUT') accum.set(type.id, StatusOfShow.SoldOut);
        else if (type.status === 'NOT_ON_SALE') accum.set(type.id, StatusOfShow.NotOnSale);
        else if (type.status === 'ON_SALE') accum.set(type.id, StatusOfShow.OnSale);
        return accum;
    }, new Map());
    return statusesMap;
}

export const getStatusOfShow = async (statusId: number): Promise<StatusOfShow> => {
    const status: StatusOfShow | undefined = (await getStatusesOfShow()).get(statusId);
    return status || StatusOfShow.NotOnSale;
};

export const getStatusIdsOfShow = async (): Promise<Map<StatusOfShow, number>> => {
    if (showStatusIds) return showStatusIds;
    const typesDao: dao.StatusOfShow[] = await serv.getStatusesOfShow();
    const idsMap: Map<StatusOfShow, number> = typesDao.reduce((accum, type) => {
        if (type.status === 'SOLD_OUT') accum.set(StatusOfShow.SoldOut, type.id);
        else if (type.status === 'NOT_ON_SALE') accum.set(StatusOfShow.NotOnSale, type.id);
        else if (type.status === 'ON_SALE') accum.set(StatusOfShow.OnSale, type.id);
        return accum;
    }, new Map());
    return idsMap;
}

export const getShowStatusId = async (type: StatusOfShow): Promise<number> => {
    const id: number | undefined = (await getStatusIdsOfShow()).get(type);
    return id || 0;
};