

# Licensee Reporter -- Full System Wireframe Implementation

## Overview
Transform the Licensee Reporter role from a flat page layout into a sidebar-based interface (matching the Licensee Admin pattern), with enhanced screens covering all functional areas described in the spec.

---

## 1. Reporter Layout with Sidebar

Create `src/components/reporter/ReporterLayout.tsx` modeled after the existing `LicenseeAdminLayout.tsx`.

**Sidebar navigation items:**
- Dashboard
- New Incident (primary action)
- My Submissions
- Notifications (with unread badge)
- My Analytics
- Profile and Security

**Top area:** Organisation name badge (e.g., "Express Courier Sdn Bhd") with licence number.

**Routing:** Update `App.tsx` to nest all `/reporter/*` routes under this layout using `<Outlet />`.

---

## 2. Dashboard Enhancements

Update `src/pages/reporter/Dashboard.tsx`:

**KPI Cards (5 cards):**
- My Drafts
- Submitted Cases
- Cases Under Review
- Escalated Cases
- Closed Cases

**Sections:**
- Primary "Create New Incident" button (prominent, glowing)
- My Drafts list with 7-day deadline badges (existing, keep as-is)
- Recent Activity panel (status changes, clarification requests, escalation notifications)
- Announcements panel (keep existing)

Remove the top "Home" / "Change Role" buttons (navigation now handled by sidebar and header).

---

## 3. Create Incident Flow (Restructured 6 Steps)

Rewrite `src/pages/reporter/NewIncident.tsx` to match the spec's 6-step structure:

| Step | Title | Fields |
|------|-------|--------|
| 1 | Incident Information | Title, Date, Time, Description, Category dropdown |
| 2 | Location Details | Location Type, Branch/Hub Name, Address, State, Postal Code |
| 3 | Affected Parcel/Items | Tracking Number, Parcel Type, Sender Details, Receiver Details, Item Description. Support multiple item entries (add/remove) |
| 4 | Suspected Violation | Violation Type dropdown, Severity (read-only if system-assigned), Supporting Explanation |
| 5 | Supporting Documents | Multi-file upload with type/size validation, file list with remove button |
| 6 | Declaration | Confirmation checkbox, digital declaration statement, summary review, Submit button |

Keep existing features: auto-save indicator, Save Draft button on all steps, stepper UI.

---

## 4. Incident List Page

Update `src/pages/reporter/Incidents.tsx`:

**Table columns:**
- Reference Number
- Incident Title
- Category
- Status (color-coded badge)
- Last Updated
- Submitted Date

**Features:**
- Search by keyword
- Filter by status (dropdown)
- Filter by date range (date pickers)
- Sort by latest (default)
- Only show own incidents

Remove the Back button (sidebar handles navigation).

---

## 5. Incident Detail View (Read-Only)

Enhance `src/pages/reporter/IncidentDetails.tsx`:

**Layout -- left panel sections (all read-only, muted/disabled style):**
- Incident Information
- Location Details
- Affected Items
- Violation Details
- Supporting Documents (download only)

**Right panel:**
- Status Badge (prominent)
- Timeline Component (chronological: draft created, submission, clarification request/response, status updates, escalation, closure)
- Each event shows: Date, Time, Actor (System/Officer/Reporter), Description

**Tabs remain:** Timeline, RFIs and Comments (clarification response flow), AI Insights

**Clarification Response Flow** (within RFIs tab -- already implemented):
- View clarification message from Case Officer
- Respond with text
- Upload additional documents
- Submit response (logged in timeline)

---

## 6. Notifications Page

Create `src/pages/reporter/Notifications.tsx`:

Show categorized notifications:
- Draft reminders (7-day deadline approaching)
- Clarification requests from MCMC
- Status update notifications
- Escalation notifications
- Case closure notifications

Each notification: icon, message, timestamp, read/unread state, action button where applicable.

---

## 7. Personal Analytics Page

Create `src/pages/reporter/Analytics.tsx`:

Simple personal metrics (own data only):
- Total cases submitted
- Average submission time
- Percentage of cases escalated
- Status distribution (pie/donut chart)
- Submission trend over time (line chart)

---

## 8. Profile and Security Page

Create `src/pages/reporter/ProfileSecurity.tsx`:

- Change Password form
- Enable/Disable MFA toggle
- Last Login History table
- Account Status display
- Session Activity log

---

## Files Changed

| Action | File |
|--------|------|
| Create | `src/components/reporter/ReporterLayout.tsx` |
| Edit | `src/pages/reporter/Dashboard.tsx` |
| Edit | `src/pages/reporter/NewIncident.tsx` |
| Edit | `src/pages/reporter/Incidents.tsx` |
| Edit | `src/pages/reporter/IncidentDetails.tsx` |
| Create | `src/pages/reporter/Notifications.tsx` |
| Create | `src/pages/reporter/Analytics.tsx` |
| Create | `src/pages/reporter/ProfileSecurity.tsx` |
| Edit | `src/App.tsx` |

---

## Technical Notes

- ReporterLayout follows the same pattern as `LicenseeAdminLayout` (collapsible sidebar, `<Outlet />` for nested routes)
- Routes restructured: `/reporter` parent route with children (`dashboard`, `incidents`, `incidents/new`, `incidents/:id`, `notifications`, `analytics`, `profile`)
- Charts use `recharts` (already installed)
- All data remains mock/static (no backend)
- Existing status color utilities and badge styles reused
- The 6-step incident form is restructured to match the spec's field groupings while preserving the stepper UI pattern

