import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

export interface FinanceItem {
  id: string;
  start_date: string;
  title: string;
  description: string | null;
  status: "pending" | "completed";
  type: "expense" | "income";
  amount: number;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface FinanceInput {
  start_date: string;
  title: string;
  description?: string;
  status: "pending" | "completed";
  type: "expense" | "income";
  amount: number;
}

export class FinanceService {
  private supabase;

  constructor() {
    this.supabase = createClientComponentClient<Database>();
  }

  private async getCurrentUserId(): Promise<string> {
    const {
      data: { session },
      error,
    } = await this.supabase.auth.getSession();
    if (error || !session?.user) {
      throw new Error("Usuário não autenticado");
    }
    return session.user.id;
  }

  async getAllItems() {
    const { data, error } = await this.supabase
      .from("finances")
      .select("*")
      .order("start_date", { ascending: false });

    if (error) {
      console.error("Erro ao buscar itens:", error);
      throw error;
    }

    return data;
  }

  async addItem(item: FinanceInput) {
    const user_id = await this.getCurrentUserId();

    const { data, error } = await this.supabase
      .from("finances")
      .insert([{ ...item, user_id }])
      .select()
      .single();

    if (error) {
      console.error("Erro ao adicionar item:", error);
      throw error;
    }

    return data;
  }

  async updateItem(id: string, item: Partial<FinanceInput>) {
    const user_id = await this.getCurrentUserId();

    const { data, error } = await this.supabase
      .from("finances")
      .update({ ...item, user_id })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Erro ao atualizar item", error);
      throw error;
    }

    return data;
  }

  async deleteItem(id: string) {
    const { error } = await this.supabase
      .from("finances")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Erro ao excluir item:", error);
      throw error;
    }

    return true;
  }

  async getTotals(startDate?: string, endDate?: string) {
    const user_id = await this.getCurrentUserId();
    let query = this.supabase
      .from("finances")
      .select("*")
      .eq("user_id", user_id);

    if (startDate) {
      query = query.gte("start_date", startDate);
    }
    if (endDate) {
      query = query.lte("start_date", endDate);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return {
      income: data
        .filter((item) => item.type === "income")
        .reduce((sum, item) => sum + item.amount, 0),
      expense: data
        .filter((item) => item.type === "expense")
        .reduce((sum, item) => sum + item.amount, 0),
    };
  }
}

export const financeService = new FinanceService();
