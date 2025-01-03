import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const supabase = createClientComponentClient();

export async function signIn(accessCode: string) {
  try {
    // Tenta fazer login diretamente com email/senha
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: "admin@gajoy.com", // O email que você cadastrou
        password: accessCode,
      });

    if (signInError) {
      console.error("Erro no login:", signInError);
      return { success: false, error: "Código de acesso inválido" };
    }

    if (signInData.user) {
      return { success: true };
    }

    return { success: false, error: "Código de acesso inválido" };
  } catch (error) {
    console.error("Erro durante o login:", error);
    return { success: false, error: "Erro ao fazer login" };
  }
}
