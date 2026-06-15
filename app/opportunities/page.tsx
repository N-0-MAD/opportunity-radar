import { PageHeader } from "@/components/page-header"
import { KanbanBoard } from "@/components/opportunities/kanban-board"

export default function OpportunitiesPage() {
  return (
    <>
      <PageHeader
        title="My Opportunities"
        description="Track every application through your pipeline. Drag cards to update status."
      />
      <KanbanBoard />
    </>
  )
}
