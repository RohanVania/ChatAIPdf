import { integer, pgTable, serial, text, timestamp, varchar,pgEnum, primaryKey,boolean} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters"
 
export const roleEnum=pgEnum('role',['user','ai'])

// export const users = pgTable('users', {
//   id: serial('id').primaryKey(),
//   fullName: text('full_name'),
//   phone: varchar('phone', { length: 256 }),
// });

export const chatPdf=pgTable("chatpdf",{
    id:serial('id').primaryKey().notNull(),
    // id:text('id').primaryKey().notNull().$defaultFn(()=>crypto.randomUUID()),
    pdfName:text('pdf_name').notNull(),
    pdfUrl:text("pdf_url").notNull(),
    createdAt:timestamp("created_At").notNull().defaultNow(),
    fileKey:text("file_key").notNull(),
    // userId:varchar("user_id",{length:256}).notNull(), //Clerk database for example this will come from
    userId:text("user_id").notNull().$defaultFn(()=>crypto.randomUUID()), //Clerk database for example this will come from
    provider:text("provider_name") // So that we can access only pdf for that user
})



export const messages = pgTable("messages", {
  id: serial('id').primaryKey().notNull(),
  chatId: integer('chat_id').references(() => chatPdf.id).notNull(), 
  content: text('content').notNull(),
  createdAt: timestamp("created_At").notNull().defaultNow(),
  role: roleEnum('role').notNull()
});


//* For Typescript

export type DrizzleChatPDF=typeof chatPdf.$inferSelect;

// export type DrizzleUser=typeof users.$inferInsert

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})
 
export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)
 
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})
 
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)
 
export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
)

 
 
