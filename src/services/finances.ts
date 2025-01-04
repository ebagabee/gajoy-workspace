import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

// Tipos
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
    const { data, error } = await this.supabase
      .from("finances")
      .insert([item])
      .select()
      .single();

    if (error) {
      console.error("Erro ao adicionar item:", error);
      throw error;
    }

    return data;
  }

  async updateItem(id: string, item: Partial<FinanceInput>) {
    const { data, error } = await this.supabase
      .from("finances")
      .update(item)
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
}

export const financeService = new FinanceService();
