import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ArtistLinkTypes = {
  __typename?: 'ArtistLinkTypes';
  classics: Array<Maybe<ClassicLinkType>>;
  musicPlayers: Array<Maybe<MusicPlayerLinkType>>;
  shows: Array<Maybe<ShowsLinkType>>;
};

export type ClassicLinkInput = {
  title: Scalars['String'];
  url: Scalars['String'];
};

export type ClassicLinkType = {
  __typename?: 'ClassicLinkType';
  title: Scalars['String'];
  url: Scalars['String'];
};

export type MusicPlayerLinkInput = {
  playerType: MusicPlayerType;
  url: Scalars['String'];
};

export type MusicPlayerLinkType = {
  __typename?: 'MusicPlayerLinkType';
  playerType: MusicPlayerType;
  url: Scalars['String'];
};

export enum MusicPlayerType {
  AppleMusic = 'APPLE_MUSIC',
  SoundCloud = 'SOUND_CLOUD',
  Spotify = 'SPOTIFY'
}

export type Mutation = {
  __typename?: 'Mutation';
  createClassicLink: Scalars['Int'];
  createMusicPlayerLink: Scalars['Int'];
  createShowLink: Scalars['Int'];
};


export type MutationCreateClassicLinkArgs = {
  artistId: Scalars['String'];
  classicLink: ClassicLinkInput;
};


export type MutationCreateMusicPlayerLinkArgs = {
  artistId: Scalars['String'];
  musicPlayerLink: MusicPlayerLinkInput;
};


export type MutationCreateShowLinkArgs = {
  artistId: Scalars['String'];
  showLink: ShowsLinkInput;
};

export type Query = {
  __typename?: 'Query';
  artistLinks?: Maybe<ArtistLinkTypes>;
};


export type QueryArtistLinksArgs = {
  artistId: Scalars['String'];
};

export type ShowsLinkInput = {
  date: Scalars['String'];
  status: StatusOfShow;
  venue: Scalars['String'];
};

export type ShowsLinkType = {
  __typename?: 'ShowsLinkType';
  date: Scalars['String'];
  status: StatusOfShow;
  venue: Scalars['String'];
};

export enum StatusOfShow {
  NotOnSale = 'NOT_ON_SALE',
  OnSale = 'ON_SALE',
  SoldOut = 'SOLD_OUT'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ArtistLinkTypes: ResolverTypeWrapper<ArtistLinkTypes>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ClassicLinkInput: ClassicLinkInput;
  ClassicLinkType: ResolverTypeWrapper<ClassicLinkType>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  MusicPlayerLinkInput: MusicPlayerLinkInput;
  MusicPlayerLinkType: ResolverTypeWrapper<MusicPlayerLinkType>;
  MusicPlayerType: MusicPlayerType;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ShowsLinkInput: ShowsLinkInput;
  ShowsLinkType: ResolverTypeWrapper<ShowsLinkType>;
  StatusOfShow: StatusOfShow;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ArtistLinkTypes: ArtistLinkTypes;
  Boolean: Scalars['Boolean'];
  ClassicLinkInput: ClassicLinkInput;
  ClassicLinkType: ClassicLinkType;
  Int: Scalars['Int'];
  MusicPlayerLinkInput: MusicPlayerLinkInput;
  MusicPlayerLinkType: MusicPlayerLinkType;
  Mutation: {};
  Query: {};
  ShowsLinkInput: ShowsLinkInput;
  ShowsLinkType: ShowsLinkType;
  String: Scalars['String'];
};

export type ArtistLinkTypesResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtistLinkTypes'] = ResolversParentTypes['ArtistLinkTypes']> = {
  classics?: Resolver<Array<Maybe<ResolversTypes['ClassicLinkType']>>, ParentType, ContextType>;
  musicPlayers?: Resolver<Array<Maybe<ResolversTypes['MusicPlayerLinkType']>>, ParentType, ContextType>;
  shows?: Resolver<Array<Maybe<ResolversTypes['ShowsLinkType']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClassicLinkTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClassicLinkType'] = ResolversParentTypes['ClassicLinkType']> = {
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MusicPlayerLinkTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MusicPlayerLinkType'] = ResolversParentTypes['MusicPlayerLinkType']> = {
  playerType?: Resolver<ResolversTypes['MusicPlayerType'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createClassicLink?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationCreateClassicLinkArgs, 'artistId' | 'classicLink'>>;
  createMusicPlayerLink?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationCreateMusicPlayerLinkArgs, 'artistId' | 'musicPlayerLink'>>;
  createShowLink?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationCreateShowLinkArgs, 'artistId' | 'showLink'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  artistLinks?: Resolver<Maybe<ResolversTypes['ArtistLinkTypes']>, ParentType, ContextType, RequireFields<QueryArtistLinksArgs, 'artistId'>>;
};

export type ShowsLinkTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShowsLinkType'] = ResolversParentTypes['ShowsLinkType']> = {
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusOfShow'], ParentType, ContextType>;
  venue?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ArtistLinkTypes?: ArtistLinkTypesResolvers<ContextType>;
  ClassicLinkType?: ClassicLinkTypeResolvers<ContextType>;
  MusicPlayerLinkType?: MusicPlayerLinkTypeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ShowsLinkType?: ShowsLinkTypeResolvers<ContextType>;
};

