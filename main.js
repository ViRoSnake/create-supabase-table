"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
require('dotenv').config();
function main() {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const MockData = {
            table_name: "test4",
            table_columns: [
                {
                    name: "col1",
                    type: "uuid",
                },
                {
                    name: "col2",
                    type: "text",
                },
            ],
        };
        const sqlColumns = getSqlColumnsDefinitions(MockData);
        const supabaseAdmin = (0, supabase_js_1.createClient)((_a = process.env.SUPABASE_URL) !== null && _a !== void 0 ? _a : '', (_b = process.env.SUPABASE_SERVICE_ROLE_KEY) !== null && _b !== void 0 ? _b : '');
        const { data, error } = yield supabaseAdmin.rpc('create_dynamic_table', {
            password: (_c = process.env.FUNCTION_PASSWORD) !== null && _c !== void 0 ? _c : '',
            table_schema: {
                table_name: MockData.table_name,
                column_defs: sqlColumns
            }
        });
        if (error) {
            console.error(error);
            return;
        }
    });
}
exports.default = main;
main();
function getSqlColumnsDefinitions(table) {
    const name = table.table_name;
    const columns = table.table_columns;
    const columnsWithTypes = columns
        .map((column) => `${column.name} ${column.type}`)
        .join(", ");
    return columnsWithTypes;
}
