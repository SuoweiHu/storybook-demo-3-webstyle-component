'use client';
import React, { useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Tab
// Wraps a single tab panel. The `label` prop appears in the navigation bar.
// ─────────────────────────────────────────────────────────────────────────────
interface TabProps {
  label: string;
  children: React.ReactNode;
}

export function Tab({ children }: TabProps) {
  // Rendered by TabGroup – this component is just a data carrier.
  return <>{children}</>;
}

// ─────────────────────────────────────────────────────────────────────────────
// TabGroup
// Reads its <Tab> children, renders the pagetabs-nav-tint structure, and
// manages active-tab state in React so no external JS is needed.
// ─────────────────────────────────────────────────────────────────────────────
interface TabGroupProps {
  /** Optional CSS variant class for the nav container, e.g. "pagetabs-nav-dark".
   *  Defaults to "pagetabs-nav-tint" (the standard webstyle tint variant). */
  navClass?: string;
  children: React.ReactNode;
}

export function TabGroup({ navClass = 'pagetabs-nav-tint', children }: TabGroupProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Collect only <Tab> children (ignores nulls / fragments / etc.)
  const tabs = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<TabProps> =>
      React.isValidElement(child) && (child.type === Tab || (child.type as any).displayName === 'Tab'),
  );

  return (
    <div className={navClass}>
      {/* Tab navigation */}
      <ul>
        {tabs.map((tab, index) => (
          <li key={index}>
            <a
              className={index === activeIndex ? 'pagetabs-select' : ''}
              onClick={(e) => {
                e.preventDefault();
                setActiveIndex(index);
              }}
              style={{ cursor: 'pointer' }}
              role="tab"
              aria-selected={index === activeIndex}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveIndex(index);
                }
              }}
            >
              {tab.props.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Tab content */}
      <div className="tab-content">
        {tabs.map((tab, index) => (
          <div key={index} className={`tab-pane${index === activeIndex ? ' active' : ''}`}>
            {tab.props.children}
          </div>
        ))}
      </div>
    </div>
  );
}

// Set displayName so the filter above still works after minification
Tab.displayName = 'Tab';
TabGroup.displayName = 'TabGroup';
