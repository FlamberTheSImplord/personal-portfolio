// Shared filter UI for the UI Library and UI Tips pages.
// FacetFilter is the shadcn/ui "faceted filter" pattern (popover + searchable multi-select list with counts),
// built on react-aria-components, which BoardUI already uses, so focus, keyboard and screen-reader behaviour come for free.
import { useEffect, type RefObject } from 'react'
import { Autocomplete, Button, Dialog, DialogTrigger, Input, ListBox, ListBoxItem, Popover, SearchField, useFilter } from 'react-aria-components'
import { Check, ChevronDown, X } from 'lucide-react'
import './filters.css'

export type FacetOption = {id: string, count: number}

export function FacetFilter({label, options, selected, onChange}: {label: string, options: FacetOption[], selected: string[], onChange: (next: string[]) => void}) {
  const {contains} = useFilter({sensitivity: 'base'})
  // Options with no results stay listed only while selected, so a choice never vanishes from under you.
  const items = options.filter(o => o.count || selected.includes(o.id))
  const list = <ListBox aria-label={label} className="fx-list" items={items} selectionMode="multiple" selectedKeys={selected}
    onSelectionChange={keys => onChange(keys === 'all' ? items.map(o => o.id) : [...keys].map(String))}
    renderEmptyState={() => <p className="fx-empty">No match.</p>}>
    {o => <ListBoxItem id={o.id} textValue={o.id} className="fx-option">
      {({isSelected}) => <><span className="fx-check" aria-hidden="true">{isSelected && <Check size={11} strokeWidth={3}/>}</span><span className="fx-label">{o.id}</span><span className="fx-count">{o.count}</span></>}
    </ListBoxItem>}
  </ListBox>
  return <DialogTrigger>
    <Button className={`fx-trigger${selected.length ? ' on' : ''}`}>
      {label}{selected.length > 0 && <span className="fx-badge">{selected.length}</span>}<ChevronDown size={13} aria-hidden="true"/>
    </Button>
    <Popover placement="bottom start" offset={6} className="fx-popover">
      <Dialog aria-label={`Filter by ${label.toLowerCase()}`} className="fx-dialog">
        {items.length > 7
          ? <Autocomplete filter={contains}>
              <SearchField aria-label={`Find a ${label.toLowerCase()}`} className="fx-search" autoFocus><Input placeholder={`Find a ${label.toLowerCase()}…`}/></SearchField>
              {list}
            </Autocomplete>
          : list}
        {selected.length > 0 && <button type="button" className="fx-clear" onClick={() => onChange([])}>Clear {label.toLowerCase()}</button>}
      </Dialog>
    </Popover>
  </DialogTrigger>
}

/** One chip per active filter value; × removes it. */
export function ActiveFilters({items, onRemove, onClear}: {items: {facet: string, value: string, label?: string}[], onRemove: (facet: string, value: string) => void, onClear: () => void}) {
  if (!items.length) return null
  return <div className="fx-active" role="group" aria-label="Active filters">
    {items.map(i => <button type="button" key={`${i.facet}:${i.value}`} className="fx-chip" onClick={() => onRemove(i.facet, i.value)} aria-label={`Remove ${i.label ?? i.value}`}>
      <span className="fx-chip-facet">{i.facet}</span>{i.label ?? i.value}<X size={12} aria-hidden="true"/>
    </button>)}
    <button type="button" className="fx-clear-all" onClick={onClear}>Clear all</button>
  </div>
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
/** Marks every occurrence of the given terms (case-insensitive). */
export function Highlight({text, terms}: {text: string, terms: string[]}) {
  const t = [...new Set(terms.filter(x => x.length > 1))].sort((a, b) => b.length - a.length)
  if (!t.length) return <>{text}</>
  const parts = text.split(new RegExp(`(${t.map(escape).join('|')})`, 'gi'))
  return <>{parts.map((p, i) => i % 2 ? <mark key={i} className="fx-mark">{p}</mark> : p)}</>
}

/** Press "/" anywhere (outside a text field) to jump to the search box. */
export function useSlashFocus(ref: RefObject<HTMLInputElement | null>) {
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if ((e.key !== '/' && e.code !== 'Slash') || e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) return
      if ((e.target as HTMLElement).closest('input, textarea, select, [contenteditable="true"]')) return
      e.preventDefault(); ref.current?.focus(); ref.current?.select()
    }
    addEventListener('keydown', on)
    return () => removeEventListener('keydown', on)
  }, [ref])
}

export function SlashHint() { return <kbd className="fx-kbd" aria-hidden="true" title="Press / to search">/</kbd> }

/** Comma-separated list from the URL, keeping only known values. */
export const readList = <T extends string>(p: URLSearchParams, key: string, allowed: readonly T[]): T[] =>
  (p.get(key) ?? '').split(',').filter((v): v is T => allowed.includes(v as T))
