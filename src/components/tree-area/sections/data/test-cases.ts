export type Node = {
  id: string
  name: string
  nodes?: Node[]
}

export const erpTree: Node = {
  id: '1',
  name: 'ERP',
  nodes: [
    {
      id: '1.1',
      name: 'HR',
      nodes: [
        {
          id: '1.1.1',
          name: 'Onboarding',
          nodes: [
            {
              id: '1.1.1.1',
              name: 'Please change toe collapse / expand behavior Please change toe collapse / expand behavior Please change toe collapse / expand behavior',
            },
            { id: '1.1.1.2', name: 'Account Setup' },
            { id: '1.1.1.3', name: 'Orientation Session' },
            { id: '1.1.1.4', name: 'Equipment Allocation' },
          ],
        },
        {
          id: '1.1.2',
          name: 'Recruitment',
          nodes: [
            { id: '1.1.2.1', name: 'Job Posting' },
            { id: '1.1.2.2', name: 'Applicant Screening' },
            { id: '1.1.2.3', name: 'Interview Scheduling' },
            { id: '1.1.2.4', name: 'Offer Letters' },
          ],
        },
        {
          id: '1.1.3',
          name: 'Payroll',
          nodes: [
            { id: '1.1.3.1', name: 'Salary Processing' },
            { id: '1.1.3.2', name: 'Tax Deductions' },
            { id: '1.1.3.3', name: 'Bonus Allocation' },
          ],
        },
        {
          id: '1.1.4',
          name: 'Employee SignUp',
          nodes: [
            { id: '1.1.4.1', name: 'Form Submission' },
            { id: '1.1.4.2', name: 'ID Verification' },
          ],
        },
      ],
    },
    {
      id: '1.2',
      name: 'Finance',
      nodes: [
        {
          id: '1.2.1',
          name: 'Budgeting',
          nodes: [
            { id: '1.2.1.1', name: 'Annual Budget' },
            { id: '1.2.1.2', name: 'Department Budget' },
          ],
        },
        {
          id: '1.2.2',
          name: 'Invoicing',
          nodes: [
            { id: '1.2.2.1', name: 'Generate Invoice' },
            { id: '1.2.2.2', name: 'Payment Tracking' },
            { id: '1.2.2.3', name: 'Late Fee Calculation' },
          ],
        },
      ],
    },
    {
      id: '1.3',
      name: 'Inventory',
      nodes: [
        {
          id: '1.3.1',
          name: 'Stock Management',
          nodes: [
            { id: '1.3.1.1', name: 'Stock Entry' },
            { id: '1.3.1.2', name: 'Stock Adjustment' },
            { id: '1.3.1.3', name: 'Low Stock Alerts' },
          ],
        },
        {
          id: '1.3.2',
          name: 'Orders',
          nodes: [
            { id: '1.3.2.1', name: 'Purchase Orders' },
            { id: '1.3.2.2', name: 'Sales Orders' },
            { id: '1.3.2.3', name: 'Order Returns' },
          ],
        },
      ],
    },
    {
      id: '1.4',
      name: 'Manufacturing',
      nodes: [
        {
          id: '1.4.1',
          name: 'Production',
          nodes: [
            { id: '1.4.1.1', name: 'Work Orders' },
            { id: '1.4.1.2', name: 'Quality Checks' },
          ],
        },
        {
          id: '1.4.2',
          name: 'Maintenance',
          nodes: [
            { id: '1.4.2.1', name: 'Equipment Servicing' },
            { id: '1.4.2.2', name: 'Spare Parts Inventory' },
          ],
        },
      ],
    },
    {
      id: '1.5',
      name: 'CRM',
      nodes: [
        {
          id: '1.5.1',
          name: 'Customer Support',
          nodes: [
            { id: '1.5.1.1', name: 'Ticket System' },
            { id: '1.5.1.2', name: 'Knowledge Base' },
          ],
        },
        {
          id: '1.5.2',
          name: 'Sales Pipeline',
          nodes: [
            { id: '1.5.2.1', name: 'Lead Tracking' },
            { id: '1.5.2.2', name: 'Opportunity Management' },
          ],
        },
      ],
    },
  ],
}
