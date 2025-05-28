import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

class RequestStore {
  resultData: any;

  currency = "";
  startDate = "";
  endDate = "";  // добавил поле endDate
  days = 0;
  result: any = null;
  error: string | null = null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrency = (val: string) => {
    this.currency = val;
  };

  setStartDate = (val: string) => {
    this.startDate = val;
  };

  setEndDate = (val: string) => {   // Добавлен метод для endDate
    this.endDate = val;
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
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
      this.result = null;
    });

    try {
      const res = await axios.post("https://exchange-r7ay.onrender.com/api/forecast", {
        currency: this.currency,
        startDate: this.startDate,
        days: this.days,
      });

      runInAction(() => {
        this.result = res.data;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.response?.data?.message || "Недостаточно данных для прогнозирования.";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  sendconvert = async ({ from, to, amount }: { from: string, to: string, amount: number }) => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
      this.result = null;
    });
  
    try {
      const res = await axios.post("https://exchange-r7ay.onrender.com/convert", {
        from,
        to,
        amount,
      });
  
      runInAction(() => {
        this.result = res.data;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.response?.data?.message || "Ошибка при конвертации.";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
  

  historyArchive = async (currency: string, start: string, end: string) => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
      this.result = null;
    });
  
    try {
      const res = await axios.get("https://exchange-r7ay.onrender.com/currency/history", {
        params: {
          start,
          end,
        },
      });
  
      runInAction(() => {
        this.result = res.data;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.response?.data?.message || "Недостаточно данных для прогнозирования.";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
  

  forecastavtual = async () => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
      this.result = null;
    });

    try {
      const res = await axios.post("https://exchange-r7ay.onrender.com/forecast/test", {
        currency: this.currency,
        startDate: this.startDate,
        days: this.days,
      });

      runInAction(() => {
        this.result = res.data;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.response?.data?.message || "Недостаточно данных для прогнозирования.";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  fetchNationalBankRates = async () => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
      this.result = null;
    });

    try {
      const response = await fetch("https://exchange-r7ay.onrender.com/fxkg/central");
      const json = await response.json();

      runInAction(() => {
        if (json.success) {
          const rawData = json.data;
          const excludedKeys = ['id', 'created_at', 'updated_at', 'is_current'];

          this.result = Object.entries(rawData)
            .filter(([key]) => !excludedKeys.includes(key))
            .map(([key, value]) => ({
              Currency: key.toUpperCase(),
              RatetoKGS: value,
            }));
        } else {
          this.error = "Ошибка при загрузке данных";
        }
      });
    } catch (e: any) {
      runInAction(() => {
        this.error = "Ошибка запроса: " + e.message;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  fetchCommersBankRates = async () => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
      // this.result = null; // можно не обнулять, если не нужно
    });

    try {
      const res = await axios.get("https://exchange-r7ay.onrender.com/fxkg/current", {
        headers: {
          "Cache-Control": "no-cache",
        },
        validateStatus: (status) => status === 200 || status === 304,
      });

      runInAction(() => {
        if (res.status === 200 && res.data) {
          this.result = res.data;
        }
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.response?.data?.message || "Ошибка при получении данных.";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  BankRates = async () => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
      this.result = null;
    });

    try {
      const params = {
        currency: this.currency,
        startDate: this.startDate,
        days: this.days,
      };

      const res = await axios.get("https://exchange-r7ay.onrender.com/fxkg/current", { params });

      runInAction(() => {
        this.result = res.data;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.response?.data?.message || "Ошибка при получении данных.";
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}

export const requestStore = new RequestStore();
