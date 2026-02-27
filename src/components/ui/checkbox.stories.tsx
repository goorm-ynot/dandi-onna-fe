import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';
import { useState } from 'react';

/**
 * Checkbox component for binary choice selection and multi-select lists.
 * 
 * A custom-styled checkbox with label support built for accessibility and consistency.
 * Features a branded purple accent color when checked, smooth transitions, and proper
 * disabled states. Commonly used in forms, settings panels, filters, terms acceptance,
 * and todo lists. Supports both controlled and uncontrolled modes with optional labels.
 */
const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    label: {
      control: 'text',
      description: 'Label text displayed next to checkbox',
    },
    onCheckedChange: {
      action: 'checked changed',
      description: 'Callback when checkbox state changes',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default unchecked checkbox without label.
 * Basic state for binary selection.
 */
export const Default: Story = {
  args: {
    checked: false,
    id: 'default-checkbox',
  },
};

/**
 * Checked checkbox showing active state.
 * Displays purple background with white checkmark.
 */
export const Checked: Story = {
  args: {
    checked: true,
    id: 'checked-checkbox',
  },
};

/**
 * Checkbox with descriptive label text.
 * Most common pattern for forms and settings.
 */
export const WithLabel: Story = {
  args: {
    checked: false,
    label: 'I agree to the terms and conditions',
    id: 'labeled-checkbox',
  },
};

/**
 * Checked checkbox with label.
 * Shows selected state with accompanying text.
 */
export const CheckedWithLabel: Story = {
  args: {
    checked: true,
    label: 'Email notifications enabled',
    id: 'checked-labeled',
  },
};

/**
 * Disabled unchecked checkbox.
 * Prevents interaction and shows reduced opacity.
 */
export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'Disabled option',
    id: 'disabled-checkbox',
  },
};

/**
 * Disabled checked checkbox.
 * Shows locked selected state that cannot be changed.
 */
export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Permanently enabled feature',
    id: 'disabled-checked',
  },
};

/**
 * Interactive checkbox demonstrating controlled state.
 * Click to toggle between checked and unchecked.
 */
export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <Checkbox
        id="interactive-checkbox"
        checked={checked}
        onCheckedChange={setChecked}
        label="Click to toggle"
      />
    );
  },
};

/**
 * Checkbox with long multiline label text.
 * Demonstrates proper text wrapping behavior.
 */
export const LongLabel: Story = {
  render: () => (
    <div className="w-96">
      <Checkbox
        id="long-label"
        checked={false}
        label="I have read and agree to the Terms of Service, Privacy Policy, and Cookie Policy. I understand that my data will be processed according to these documents and I consent to receiving marketing communications."
      />
    </div>
  ),
};

/**
 * Checkbox with custom styled label using React node.
 * Shows flexibility for rich label content.
 */
export const CustomLabel: Story = {
  render: () => (
    <Checkbox
      id="custom-label"
      checked={false}
      label={
        <span>
          I agree to the{' '}
          <a href="#" className="text-[#8749FE] underline hover:text-[#6A3ACC]">
            terms and conditions
          </a>
        </span>
      }
    />
  ),
};

/**
 * Multiple checkboxes in a list for multi-select.
 * Common pattern for filters, preferences, or permissions.
 */
export const CheckboxList: Story = {
  render: () => {
    const [selections, setSelections] = useState({
      newsletter: false,
      promotions: false,
      updates: false,
      announcements: true,
    });
    
    const handleChange = (key: keyof typeof selections) => (checked: boolean) => {
      setSelections(prev => ({ ...prev, [key]: checked }));
    };
    
    return (
      <div className="space-y-4 w-96">
        <h3 className="text-sm font-medium">Email Preferences</h3>
        <div className="space-y-3">
          <Checkbox
            id="newsletter"
            checked={selections.newsletter}
            onCheckedChange={handleChange('newsletter')}
            label="Weekly newsletter"
          />
          <Checkbox
            id="promotions"
            checked={selections.promotions}
            onCheckedChange={handleChange('promotions')}
            label="Promotional offers and discounts"
          />
          <Checkbox
            id="updates"
            checked={selections.updates}
            onCheckedChange={handleChange('updates')}
            label="Product updates and new features"
          />
          <Checkbox
            id="announcements"
            checked={selections.announcements}
            onCheckedChange={handleChange('announcements')}
            label="Important announcements"
          />
        </div>
      </div>
    );
  },
};

/**
 * Checkbox group with select all functionality.
 * Advanced pattern for bulk selection control.
 */
export const SelectAll: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: 1, name: 'Item 1', checked: false },
      { id: 2, name: 'Item 2', checked: true },
      { id: 3, name: 'Item 3', checked: false },
      { id: 4, name: 'Item 4', checked: true },
    ]);
    
    const allChecked = items.every(item => item.checked);
    const someChecked = items.some(item => item.checked) && !allChecked;
    
    const handleSelectAll = (checked: boolean) => {
      setItems(items.map(item => ({ ...item, checked })));
    };
    
    const handleItemChange = (id: number) => (checked: boolean) => {
      setItems(items.map(item =>
        item.id === id ? { ...item, checked } : item
      ));
    };
    
    return (
      <div className="space-y-4 w-96">
        <Checkbox
          id="select-all"
          checked={allChecked}
          onCheckedChange={handleSelectAll}
          label={
            <span className="font-medium">
              Select All ({items.filter(i => i.checked).length}/{items.length})
            </span>
          }
        />
        <div className="border-t pt-3 space-y-3 pl-8">
          {items.map(item => (
            <Checkbox
              key={item.id}
              id={`item-${item.id}`}
              checked={item.checked}
              onCheckedChange={handleItemChange(item.id)}
              label={item.name}
            />
          ))}
        </div>
      </div>
    );
  },
};

/**
 * Todo list using checkboxes to track completion.
 * Real-world example of checkbox usage in task management.
 */
export const TodoList: Story = {
  render: () => {
    const [todos, setTodos] = useState([
      { id: 1, text: 'Complete project proposal', done: true },
      { id: 2, text: 'Review pull requests', done: true },
      { id: 3, text: 'Update documentation', done: false },
      { id: 4, text: 'Prepare presentation slides', done: false },
      { id: 5, text: 'Schedule team meeting', done: false },
    ]);
    
    const handleToggle = (id: number) => (checked: boolean) => {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, done: checked } : todo
      ));
    };
    
    const completedCount = todos.filter(t => t.done).length;
    
    return (
      <div className="w-96 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">My Tasks</h3>
          <span className="text-sm text-muted-foreground">
            {completedCount}/{todos.length} completed
          </span>
        </div>
        <div className="space-y-2">
          {todos.map(todo => (
            <div
              key={todo.id}
              className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <Checkbox
                id={`todo-${todo.id}`}
                checked={todo.done}
                onCheckedChange={handleToggle(todo.id)}
                label={
                  <span className={todo.done ? 'line-through text-muted-foreground' : ''}>
                    {todo.text}
                  </span>
                }
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
};

/**
 * Settings panel with various checkbox options.
 * Demonstrates typical use in configuration interfaces.
 */
export const SettingsPanel: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      darkMode: false,
      notifications: true,
      autoSave: true,
      analytics: false,
      betaFeatures: false,
    });
    
    const handleChange = (key: keyof typeof settings) => (checked: boolean) => {
      setSettings(prev => ({ ...prev, [key]: checked }));
    };
    
    return (
      <div className="w-96 space-y-6">
        <div>
          <h3 className="text-sm font-semibold mb-3">Appearance</h3>
          <Checkbox
            id="dark-mode"
            checked={settings.darkMode}
            onCheckedChange={handleChange('darkMode')}
            label="Enable dark mode"
          />
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-sm font-semibold mb-3">Notifications</h3>
          <div className="space-y-3">
            <Checkbox
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={handleChange('notifications')}
              label="Push notifications"
            />
            <Checkbox
              id="auto-save"
              checked={settings.autoSave}
              onCheckedChange={handleChange('autoSave')}
              label="Auto-save changes"
            />
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-sm font-semibold mb-3">Advanced</h3>
          <div className="space-y-3">
            <Checkbox
              id="analytics"
              checked={settings.analytics}
              onCheckedChange={handleChange('analytics')}
              label="Share analytics data"
            />
            <Checkbox
              id="beta"
              checked={settings.betaFeatures}
              onCheckedChange={handleChange('betaFeatures')}
              label="Enable beta features"
            />
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Filter panel using checkboxes for multi-criteria filtering.
 * Common pattern in e-commerce and data tables.
 */
export const FilterPanel: Story = {
  render: () => {
    const [filters, setFilters] = useState({
      inStock: true,
      onSale: false,
      freeShipping: true,
      categories: {
        electronics: false,
        clothing: true,
        books: false,
        home: false,
      },
    });
    
    const handleFilterChange = (key: keyof Omit<typeof filters, 'categories'>) =>
      (checked: boolean) => {
        setFilters(prev => ({ ...prev, [key]: checked }));
      };
    
    const handleCategoryChange = (key: keyof typeof filters.categories) =>
      (checked: boolean) => {
        setFilters(prev => ({
          ...prev,
          categories: { ...prev.categories, [key]: checked },
        }));
      };
    
    return (
      <div className="w-80 space-y-6 p-4 border rounded-lg bg-card">
        <div>
          <h3 className="text-sm font-semibold mb-3">Filters</h3>
          <div className="space-y-3">
            <Checkbox
              id="in-stock"
              checked={filters.inStock}
              onCheckedChange={handleFilterChange('inStock')}
              label="In stock only"
            />
            <Checkbox
              id="on-sale"
              checked={filters.onSale}
              onCheckedChange={handleFilterChange('onSale')}
              label="On sale"
            />
            <Checkbox
              id="free-shipping"
              checked={filters.freeShipping}
              onCheckedChange={handleFilterChange('freeShipping')}
              label="Free shipping"
            />
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-sm font-semibold mb-3">Categories</h3>
          <div className="space-y-3">
            <Checkbox
              id="electronics"
              checked={filters.categories.electronics}
              onCheckedChange={handleCategoryChange('electronics')}
              label="Electronics"
            />
            <Checkbox
              id="clothing"
              checked={filters.categories.clothing}
              onCheckedChange={handleCategoryChange('clothing')}
              label="Clothing"
            />
            <Checkbox
              id="books"
              checked={filters.categories.books}
              onCheckedChange={handleCategoryChange('books')}
              label="Books"
            />
            <Checkbox
              id="home"
              checked={filters.categories.home}
              onCheckedChange={handleCategoryChange('home')}
              label="Home & Garden"
            />
          </div>
        </div>
      </div>
    );
  },
};

/**
 * All checkbox states shown together for quick reference.
 */
export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div>
        <p className="text-sm font-medium mb-2">Unchecked</p>
        <Checkbox id="unchecked" checked={false} label="Unchecked checkbox" />
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">Checked</p>
        <Checkbox id="checked" checked={true} label="Checked checkbox" />
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">Disabled Unchecked</p>
        <Checkbox id="disabled-unchecked" checked={false} disabled label="Disabled unchecked" />
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">Disabled Checked</p>
        <Checkbox id="disabled-checked" checked={true} disabled label="Disabled checked" />
      </div>
      
      <div>
        <p className="text-sm font-medium mb-2">Without Label</p>
        <Checkbox id="no-label" checked={false} />
      </div>
    </div>
  ),
};
