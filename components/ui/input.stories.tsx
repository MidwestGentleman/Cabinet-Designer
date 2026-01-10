import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './input';
import { Label } from './label';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-64">
      <Label htmlFor="input-example">Project Name</Label>
      <Input id="input-example" placeholder="e.g., Kitchen Cabinets" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
    value: 'Cannot edit',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter number',
    min: 0,
    max: 100,
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'email@example.com',
  },
};

export const WithValue: Story = {
  args: {
    value: '24 1/2',
    placeholder: 'Measurement',
  },
};

export const Error: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-64">
      <Label htmlFor="error-input" className="text-destructive">
        Width (invalid)
      </Label>
      <Input
        id="error-input"
        value="-5"
        className="border-destructive focus-visible:ring-destructive"
      />
      <p className="text-sm text-destructive">Value must be positive</p>
    </div>
  ),
};
