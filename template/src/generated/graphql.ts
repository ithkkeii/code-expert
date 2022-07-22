import { Level } from '../types';
import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Challenge = {
  __typename?: 'Challenge';
  content: Scalars['String'];
  id?: Maybe<Scalars['ID']>;
  level: Level;
  point: Scalars['Int'];
  slug: Scalars['String'];
  testCases: Array<Maybe<TestCase>>;
  testInputs: Array<Maybe<TestInput>>;
  title: Scalars['String'];
};

export { Level };

export type Mutation = {
  __typename?: 'Mutation';
  login: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getChallenge?: Maybe<Challenge>;
  getChallenges?: Maybe<Array<Maybe<Challenge>>>;
  getUser?: Maybe<Array<Maybe<User>>>;
};


export type QueryGetChallengeArgs = {
  slug: Scalars['String'];
};

export type TestCase = {
  __typename?: 'TestCase';
  content?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

export type TestInput = {
  __typename?: 'TestInput';
  content?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
};



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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Challenge: ResolverTypeWrapper<Challenge>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Level: Level;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  TestCase: ResolverTypeWrapper<TestCase>;
  TestInput: ResolverTypeWrapper<TestInput>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Challenge: Challenge;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  TestCase: TestCase;
  TestInput: TestInput;
  User: User;
};

export type ChallengeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Challenge'] = ResolversParentTypes['Challenge']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Level'], ParentType, ContextType>;
  point?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  testCases?: Resolver<Array<Maybe<ResolversTypes['TestCase']>>, ParentType, ContextType>;
  testInputs?: Resolver<Array<Maybe<ResolversTypes['TestInput']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LevelResolvers = EnumResolverSignature<{ Easy?: any, Hard?: any, Medium?: any }, ResolversTypes['Level']>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  login?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getChallenge?: Resolver<Maybe<ResolversTypes['Challenge']>, ParentType, ContextType, RequireFields<QueryGetChallengeArgs, 'slug'>>;
  getChallenges?: Resolver<Maybe<Array<Maybe<ResolversTypes['Challenge']>>>, ParentType, ContextType>;
  getUser?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
};

export type TestCaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['TestCase'] = ResolversParentTypes['TestCase']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestInputResolvers<ContextType = any, ParentType extends ResolversParentTypes['TestInput'] = ResolversParentTypes['TestInput']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Challenge?: ChallengeResolvers<ContextType>;
  Level?: LevelResolvers;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TestCase?: TestCaseResolvers<ContextType>;
  TestInput?: TestInputResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

