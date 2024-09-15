// src/app/api/auth/login/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { setCookie } from "next-cookies";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("authToken", token, { maxAge: 3600, path: "/" });
    return response;
  } else {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }
}
