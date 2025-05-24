
// stores/RequestStore.ts
import { makeAutoObservable } from "mobx";
import axios from "axios";

class RequestStore {
  currency = "";
  startDate = "";
  days = 0;
  result: any = null;
  error: string | null = null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Методы теперь стрелочные функции — привязка контекста сохранится
  setCurrency = (val: string) => {
    this.currency = val;
  };

  setStartDate = (val: string) => {
    this.startDate = val;
  };

  setDays = (val: number) => {
    this.days = val;
  };

  sendRequest = async () => {
    this.isLoading = true;
    this.error = null;
    this.result = null;

    try {
      const res = await axios.post("https://exchange-r7ay.onrender.com/api/forecast", {
        currency: this.currency,
        startDate: this.startDate,
        days: this.days,
      });
      this.result = res.data;
    } catch (err: any) {
      this.error = err.response?.data?.message || "Недостаточно данных для прогнозирования.";
    } finally {
      this.isLoading = false;
    }
  };
}

export const requestStore = new RequestStore();
