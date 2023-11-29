import { pgTable, foreignKey, pgEnum, serial, varchar, integer, uniqueIndex, uuid, timestamp, text } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['expired', 'invalid', 'valid', 'default'])
export const keyType = pgEnum("key_type", ['stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf'])
export const factorType = pgEnum("factor_type", ['webauthn', 'totp'])
export const factorStatus = pgEnum("factor_status", ['verified', 'unverified'])
export const aalLevel = pgEnum("aal_level", ['aal3', 'aal2', 'aal1'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['plain', 's256'])
export const popularity = pgEnum("popularity", ['popular', 'known', 'unknown'])


export const cities = pgTable("cities", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 256 }),
	countryId: integer("country_id").references(() => countries.id),
	popularity: popularity("popularity"),
});

export const countries = pgTable("countries", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 256 }),
},
(table) => {
	return {
		nameIdx: uniqueIndex("name_idx").on(table.name),
	}
});

export const workspaces = pgTable("workspaces", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	workspaceOwner: uuid("workspace_owner").notNull(),
	title: text("title").notNull(),
	iconId: text("icon_id").notNull(),
	data: text("data"),
	inTrash: text("in_trash"),
	logo: text("logo"),
	bannerUrl: text("banner_url"),
});