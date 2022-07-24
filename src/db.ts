import { Pool } from "pg";
import sqlPath from "./pg.server";

const connectionString: string = sqlPath;

const db = new Pool({ connectionString });

export default db;
