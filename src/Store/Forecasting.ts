
// stores/RequestStore.ts
import { makeAutoObservable } from "mobx";
import axios from "axios";

class RequestStore {
  resultData: any;
  map(arg0: (bank: any) => import("react").JSX.Element): unknown {
    throw new Error("Method not implemented.");
  }
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
  setLoading = (val: boolean) => {
    this.isLoading = val;
  };

  setError = (message: string | null) => {
    this.error = message;
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
  fetchNationalBankRates = async () => {
    this.isLoading = true;
    this.error = null;
    this.result = null;
  
    try {
      const res = await axios.get("https://exchange-r7ay.onrender.com/api/national-bank");
      const data = res.data;
  
      if (Array.isArray(data)) {
        this.result = data;
      } else if (data && Array.isArray(data.result)) {
        this.result = data.result;
      } else {
        this.result = [];
        this.error = "Неверный формат данных от сервера.";
      }
    } catch (err: any) {
      this.error = err.response?.data?.message || "Ошибка при получении данных.";
    } finally {
      this.isLoading = false;
    }
  };

  fetchCommersBankRates = async () => {
    this.isLoading = true;
    this.error = null;
    this.result = null;

    try {
      const res = await axios.get("https://exchange-r7ay.onrender.com/fxkg/current");
      this.result = res.data;
    } catch (err: any) {
      this.error = err.response?.data?.message || "Ошибка при получении данных.";
    } finally {
      this.isLoading = false;
    }
  };
}

export const requestStore = new RequestStore();
