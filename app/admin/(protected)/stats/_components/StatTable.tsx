'use client';

import { useActionState } from 'react';
import { Trash2 } from 'lucide-react';
import type { FormState } from '../actions';

export type ColumnDef = {
  key: string;
  label: string;
  type: 'text' | 'number' | 'color' | 'checkbox';
  step?: string;
};

type Row = { id: number };

const inputClass =
  'border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 focus:border-blue-900 flex-1 min-w-[110px]';

function ColumnInput({ column, defaultRow }: { column: ColumnDef; defaultRow?: Record<string, unknown> }) {
  if (column.type === 'checkbox') {
    return (
      <label className="flex items-center gap-1.5 text-xs text-slate-500 font-bold uppercase tracking-widest px-1">
        <input
          type="checkbox"
          name={column.key}
          defaultChecked={defaultRow ? Boolean(defaultRow[column.key]) : false}
          className="h-4 w-4"
        />
        {column.label}
      </label>
    );
  }
  if (column.type === 'color') {
    return (
      <input
        type="color"
        name={column.key}
        defaultValue={defaultRow ? String(defaultRow[column.key]) : '#3B82C4'}
        className="h-9 w-14 rounded-lg border border-slate-200 p-1"
        title={column.label}
      />
    );
  }
  return (
    <input
      type={column.type}
      name={column.key}
      step={column.type === 'number' ? column.step ?? '1' : undefined}
      defaultValue={defaultRow ? (defaultRow[column.key] as string | number) : undefined}
      placeholder={column.label}
      className={inputClass}
    />
  );
}

function StatRow<T extends Row>({
  row,
  columns,
  updateAction,
  deleteAction,
}: {
  row: T;
  columns: ColumnDef[];
  updateAction: (id: number, prevState: FormState, formData: FormData) => Promise<FormState>;
  deleteAction: (id: number) => Promise<void>;
}) {
  const [state, formAction, isPending] = useActionState(updateAction.bind(null, row.id), {});
  const rowValues = row as unknown as Record<string, unknown>;

  return (
    <div className="border-t border-slate-100 py-3 first:border-t-0">
      <form action={formAction} className="flex flex-wrap items-center gap-2">
        {columns.map((c) => (
          <ColumnInput key={c.key} column={c} defaultRow={rowValues} />
        ))}
        <button
          type="submit"
          disabled={isPending}
          className="text-blue-700 hover:bg-blue-50 disabled:opacity-60 text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-lg transition-colors"
        >
          {isPending ? 'Saving…' : 'Save'}
        </button>
        <button
          type="submit"
          formAction={deleteAction.bind(null, row.id)}
          className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
          title="Delete row"
        >
          <Trash2 size={15} />
        </button>
      </form>
      {state?.error && <p className="text-red-600 text-xs font-bold mt-1.5">{state.error}</p>}
    </div>
  );
}

function AddRowForm({
  columns,
  createAction,
}: {
  columns: ColumnDef[];
  createAction: (prevState: FormState, formData: FormData) => Promise<FormState>;
}) {
  const [state, formAction, isPending] = useActionState(createAction, {});

  return (
    <div className="mt-3 pt-3 border-t border-dashed border-slate-200">
      <form action={formAction} className="flex flex-wrap items-center gap-2">
        {columns.map((c) => (
          <ColumnInput key={c.key} column={c} />
        ))}
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-900 hover:bg-blue-800 disabled:opacity-60 text-white font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-lg transition-colors"
        >
          {isPending ? 'Adding…' : 'Add Row'}
        </button>
      </form>
      {state?.error && <p className="text-red-600 text-xs font-bold mt-1.5">{state.error}</p>}
    </div>
  );
}

export default function StatTable<T extends Row>({
  title,
  description,
  columns,
  rows,
  createAction,
  updateAction,
  deleteAction,
}: {
  title: string;
  description?: string;
  columns: ColumnDef[];
  rows: T[];
  createAction: (prevState: FormState, formData: FormData) => Promise<FormState>;
  updateAction: (id: number, prevState: FormState, formData: FormData) => Promise<FormState>;
  deleteAction: (id: number) => Promise<void>;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <h2 className="text-base font-serif text-slate-900">{title}</h2>
      {description && <p className="text-slate-500 text-xs mt-0.5 mb-2">{description}</p>}

      {rows.length === 0 && <p className="text-slate-400 text-xs py-3">No rows yet — add one below.</p>}

      {rows.map((row) => (
        <StatRow key={row.id} row={row} columns={columns} updateAction={updateAction} deleteAction={deleteAction} />
      ))}

      <AddRowForm columns={columns} createAction={createAction} />
    </div>
  );
}
