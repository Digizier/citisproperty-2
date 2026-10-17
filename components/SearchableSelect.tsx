'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Check, X, Plus } from 'lucide-react';

interface SearchableSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  searchPlaceholder?: string;
  allowCustom?: boolean;
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  dark?: boolean;
  id?: string;
}

export default function SearchableSelect({
  value,
  onChange,
  options,
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search...',
  allowCustom = true,
  className = '',
  buttonClassName = '',
  dropdownClassName = '',
  dark = false,
  id,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Filter options based on search term
  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const exactMatchExists = options.some(
    (opt) => opt.toLowerCase() === searchTerm.toLowerCase().trim()
  );

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`} id={id}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
          dark
            ? 'bg-slate-950 border-slate-800 text-white hover:border-slate-700 focus:ring-2 focus:ring-brand-gold-500'
            : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300 focus:ring-2 focus:ring-brand-gold-500'
        } ${buttonClassName}`}
      >
        <span className="truncate">
          {value || <span className={dark ? 'text-slate-500' : 'text-slate-400'}>{placeholder}</span>}
        </span>
        <ChevronDown
          className={`w-4 h-4 flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-180 text-brand-gold-500' : dark ? 'text-slate-500' : 'text-slate-400'
          }`}
        />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 top-full mt-1.5 z-50 rounded-2xl shadow-2xl border overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${
            dark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          } ${dropdownClassName}`}
          style={{ minWidth: '220px' }}
        >
          {/* Search Box Header */}
          <div className={`p-2.5 border-b ${dark ? 'border-slate-800 bg-slate-950/70' : 'border-slate-100 bg-slate-50/80'}`}>
            <div className="relative">
              <Search
                className={`w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 ${
                  dark ? 'text-slate-500' : 'text-slate-400'
                }`}
              />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchPlaceholder}
                className={`w-full pl-8 pr-7 py-1.5 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-brand-gold-500 ${
                  dark
                    ? 'bg-slate-900 border border-slate-800 text-white placeholder-slate-500'
                    : 'bg-white border border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-56 overflow-y-auto p-1.5 space-y-0.5 text-xs divide-y divide-transparent">
            {/* Custom typed option if not matching an existing option */}
            {allowCustom && searchTerm.trim() && !exactMatchExists && (
              <button
                type="button"
                onClick={() => handleSelect(searchTerm.trim())}
                className={`w-full text-left px-3 py-2 rounded-lg font-bold flex items-center justify-between gap-2 transition-colors ${
                  dark
                    ? 'bg-brand-gold-500/10 text-brand-gold-400 hover:bg-brand-gold-500/20'
                    : 'bg-brand-gold-50 text-brand-gold-700 hover:bg-brand-gold-100'
                }`}
              >
                <span className="flex items-center gap-1.5 truncate">
                  <Plus className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Use custom: &quot;{searchTerm.trim()}&quot;</span>
                </span>
                <span className="text-[10px] font-normal uppercase opacity-75">Custom</span>
              </button>
            )}

            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = opt.toLowerCase() === (value || '').toLowerCase();
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between gap-2 transition-colors ${
                      isSelected
                        ? dark
                          ? 'bg-brand-gold-500/20 text-brand-gold-400 font-bold'
                          : 'bg-brand-gold-100 text-brand-gold-900 font-bold'
                        : dark
                        ? 'hover:bg-slate-800 text-slate-200'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span className="truncate">{opt}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-brand-gold-500 flex-shrink-0" />}
                  </button>
                );
              })
            ) : (
              !searchTerm.trim() && (
                <div className={`p-4 text-center text-xs ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                  No options available
                </div>
              )
            )}

            {filteredOptions.length === 0 && searchTerm.trim() && !allowCustom && (
              <div className={`p-4 text-center text-xs ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                No matching options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
