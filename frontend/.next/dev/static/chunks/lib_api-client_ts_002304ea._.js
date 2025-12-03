(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/api-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiClient",
    ()=>apiClient,
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-client] (ecmascript) <locals>");
;
const API_URL = ("TURBOPACK compile-time value", "http://localhost:3001") || 'http://localhost:3001';
const SUPABASE_URL = ("TURBOPACK compile-time value", "https://vjhtsxyytxzzmpcjsbod.supabase.co") || 'https://vjhtsxyytxzzmpcjsbod.supabase.co';
const SUPABASE_ANON_KEY = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqaHRzeHl5dHh6em1wY2pzYm9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NTc3NzksImV4cCI6MjA4MDIzMzc3OX0.nS7-Gl_Jz8fZuJW6op5oLL5R2akBmFJ-OcXo1H3LqJc") || '';
const supabase = ("TURBOPACK compile-time truthy", 1) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(SUPABASE_URL, SUPABASE_ANON_KEY) : "TURBOPACK unreachable";
async function request(endpoint, method, data, options = {}) {
    const { token, headers, ...customConfig } = options;
    let authToken = token;
    if (!authToken) {
        const { data } = await supabase.auth.getSession();
        authToken = data.session?.access_token;
    }
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...authToken ? {
                Authorization: `Bearer ${authToken}`
            } : {},
            ...headers
        },
        ...customConfig
    };
    if (data) {
        config.body = JSON.stringify(data);
    }
    const response = await fetch(`${API_URL}${endpoint}`, config);
    if (!response.ok) {
        const errorBody = await response.json().catch(()=>({}));
        throw new Error(errorBody.message || response.statusText || 'Something went wrong');
    }
    // Handle empty responses (e.g. 204 No Content)
    if (response.status === 204) {
        return {};
    }
    return response.json();
}
const apiClient = {
    get: (endpoint, options)=>request(endpoint, 'GET', undefined, options),
    post: (endpoint, data, options)=>request(endpoint, 'POST', data, options),
    put: (endpoint, data, options)=>request(endpoint, 'PUT', data, options),
    patch: (endpoint, data, options)=>request(endpoint, 'PATCH', data, options),
    delete: (endpoint, options)=>request(endpoint, 'DELETE', undefined, options)
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=lib_api-client_ts_002304ea._.js.map