import { type User, type Session, sessionsTable, usersTable } from "./schema";
import { hash, verify } from "@node-rs/argon2";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import type { Database } from ".";
import { newId } from "./id";
import { sha256 } from "@oslojs/crypto/sha2";
import { eq } from "drizzle-orm";

const SESSION_LENGTH = 1000 * 60 * 60 * 24 * 30;

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(db: Database, token: string, userId: string): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + SESSION_LENGTH),
  }

  await db.insert(sessionsTable).values(session);

  return Promise.resolve(session);
}


export async function validateSessionToken(db: Database, token: string): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await db
    .select({ user: usersTable, session: sessionsTable })
    .from(sessionsTable)
    .innerJoin(usersTable, eq(sessionsTable.userId, usersTable.id))
    .where(eq(sessionsTable.id, sessionId));

  if (result.length < 1) {
    return { session: null, user: null };
  }

  const { user, session } = result[0];
  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, session.id));
    return { session: null, user: null };
  }
  if (Date.now() >= session.expiresAt.getTime() - SESSION_LENGTH - 15) {
    session.expiresAt = new Date(Date.now() + SESSION_LENGTH);
    await db.update(sessionsTable).set({
      expiresAt: session.expiresAt,
    })
      .where(eq(sessionsTable.id, session.id));
  }

  return { session, user };
}

export async function invalidateSession(db: Database, sessionId: string): Promise<void> {
  await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
}

export type SessionValidationResult =
  | { session: Session, user: User }
  | { session: null, user: null };

export async function createUser(db: Database, user: Omit<User, "id">): Promise<string> {
  const id = newId();

  user.password = await hash(user.password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })

  await db.insert(usersTable).values({
    id,
    ...user,
  });

  return id;
}

export async function getUserByEmail(db: Database, email: string): Promise<User | null> {
  const users = await db.select().from(usersTable).where(eq(usersTable.email, email));

  if (users.length === 0) { 
    return null
  }

  return users[0];
}


export async function getUserById(db: Database, id: string): Promise<User | null> {
  const users = await db.select().from(usersTable).where(eq(usersTable.id, id));

  if (users.length === 0) { 
    return null
  }

  return users[0];
}

export async function hashPassword(password: string): Promise<string> {
	return await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
}

export async function verifyPasswordHash(hash: string, password: string): Promise<boolean> {
	return await verify(hash, password);
}
