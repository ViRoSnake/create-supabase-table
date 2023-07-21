import { createClient, SupabaseClient } from "@supabase/supabase-js";
require('dotenv').config()

export default async function main() {
  const MockData: Table = {
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

  const supabaseAdmin = createClient(process.env.SUPABASE_URL ?? '', process.env.SUPABASE_SERVICE_ROLE_KEY ?? '');

  const {data, error} = await supabaseAdmin.rpc('create_dynamic_table', {
    password: process.env.FUNCTION_PASSWORD ?? '',
    table_schema: {
      table_name: MockData.table_name, 
      column_defs: sqlColumns
    }
  });

  if (error) {
    console.error(error);
    return;
  }
}

main();

function getSqlColumnsDefinitions(table: Table): string {
  const name = table.table_name;
  const columns = table.table_columns;
  const columnsWithTypes = columns
    .map((column) => `${column.name} ${column.type}`)
    .join(", ");

  return columnsWithTypes;
}

type ColumnType =
  | "smallint"
  | "integer"
  | "bigint"
  | "decimal"
  | "numeric"
  | "real"
  | "double precision"
  | "char"
  | "character"
  | "varchar"
  | "text"
  | "bytea"
  | "date"
  | "time"
  | "timestamp"
  | "timestamp with time zone"
  | "interval"
  | "boolean"
  | "enum"
  | "smallint[]"
  | "integer[]"
  | "bigint[]"
  | "decimal[]"
  | "numeric[]"
  | "real[]"
  | "double precision[]"
  | "character[]"
  | "varchar[]"
  | "text[]"
  | "date[]"
  | "time[]"
  | "timestamp[]"
  | "timestamp with time zone[]"
  | "interval[]"
  | "boolean[]"
  | "enum[]"
  | "json"
  | "json[]"
  | "uuid";

export type TableColumn = {
  name: string;
  type: ColumnType;
};
export type Table = {
  table_name: string;
  table_columns: TableColumn[];
};
