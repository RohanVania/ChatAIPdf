import { integer, pgTable, serial, text, timestamp, varchar,pgEnum } from "drizzle-orm/pg-core";

export const roleEnum=pgEnum('role',['systemdefined','userdefined'])

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
});

export const chatPdf=pgTable("chatpdf",{
    // id:serial('id').primaryKey().notNull(),
    id:text('id').primaryKey().notNull().$defaultFn(()=>crypto.randomUUID()),
    pdfName:text('pdf_name').notNull(),
    pdfUrl:text("pdf_url").notNull(),
    createdAt:timestamp("created_At").notNull().defaultNow(),
    fileKey:text("file_key").notNull(),
    // userId:varchar("user_id",{length:256}).notNull(), //Clerk database for example this will come from
    userId:text("user_id").notNull().$defaultFn(()=>crypto.randomUUID()), //Clerk database for example this will come from

})

export const messages = pgTable("messages", {
  id: serial('id').primaryKey().notNull(),
  chatId: integer('chat_id').references(() => chatPdf.id).notNull(), 
  content: text('content').notNull(),
  createdAt: timestamp("created_At").notNull().defaultNow(),
  role: roleEnum('role').notNull()
});


//* For Typescript

export type DrizzleChat=typeof chatPdf.$inferSelect;

