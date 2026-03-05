import http from "@/services/http";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuth = defineStore("auth", () => {
    const token = ref(localStorage.getItem("token"));

    function setToken(tokenValue) {
        localStorage.setItem("token", tokenValue);
        token.value = tokenValue;
    }

    async function checkToken() {
        try {
            const tokenAuth = "Bearer " + token.value;
            const { data } = await http.get("login/verifica", {
                headers: {
                    Authorization: tokenAuth,
                },
            });
            return true;
        } catch (error) {
            console.log(error.response.data);
            return false;
        }
    }

    async function logout() {
        try {
            const tokenAuth = "Bearer " + token.value;
            await http.post("logout/", {
                headers: {
                    Authorization: tokenAuth,
                },
            });
        } catch (error) {
            console.log("Logout API error:", error.response?.data || error);
        } finally {
            localStorage.removeItem("token");
            token.value = null;
        }
    }

    return {
        token,
        setToken,
        checkToken,
        logout,
    };
});
