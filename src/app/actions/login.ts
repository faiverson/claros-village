'use server'

import type { Login } from "utils/types";

export async function login(data: Login) {
  console.log('server action login called', data);
  return "ok"
}
