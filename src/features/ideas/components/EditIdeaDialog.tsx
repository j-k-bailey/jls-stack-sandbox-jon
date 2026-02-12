// import { useEffect } from "react";
// import { useForm, type SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/BrandButton";
// import { InlineAlert } from "@/components/common/InlineAlert";
// import {
//   FieldSet,
//   FieldGroup,
//   FieldLegend,
//   FieldSeparator,
// } from "@/components/ui/field";
// import {
//   FormInput,
//   FormTextarea,
//   FormSelect,
// } from "@/components/form/FormField";
// import { FormTagSelect } from "@/components/form/FormTagSelect";
// import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";

// import { useAuth } from "@/contexts/AuthContext";
// import {
//   getProductIdea,
//   updateProductIdea,
// } from "@/lib/firestore/productIdeas";
// import { canEditProductIdea } from "@/lib/permissions/productIdeas";

// import {
//   createProductIdeaSchema,
//   type CreateProductIdeaInput,
//   IDEA_STATUSES,
//   IDEA_PRIORITIES,
//   type UpdateProductIdeaInput,
// } from "@/lib/zodSchemas/productIdea";
// import {
//   type ProductIdea,
//   type ProductIdeaPriority,
//   type ProductIdeaStatus,
// } from "@/lib/types/productIdeas";
// import { Timestamp } from "firebase/firestore";

// interface EditIdeaDialogProps {
//   idea: ProductIdea;
//   ideaId: string;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSuccess?: (updatedIdea: ProductIdea) => void;
// }

// export function EditIdeaDialog({
//   idea,
//   ideaId,
//   open,
//   onOpenChange,
//   onSuccess,
// }: EditIdeaDialogProps) {
//   const { user, userProfile } = useAuth();

//   const role = userProfile?.role;

//   const isOwner = user?.uid === idea.ownerId;
//   const canEdit = canEditProductIdea(role, isOwner);

//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors, isDirty, isSubmitting },
//     setError,
//   } = useForm<CreateProductIdeaInput>({
//     resolver: zodResolver(createProductIdeaSchema),
//     mode: "onBlur",
//     defaultValues: idea,
//   });

//   useEffect(() => {
//     if (open) reset(idea);
//   }, [open, idea, reset]);

//   const onSubmit: SubmitHandler<UpdateProductIdeaInput> = async (data) => {
//     if (!user || !canEdit) {
//       setError("root", {
//         type: "permission",
//         message: "You do not have permission to edit this idea.",
//       });
//       return;
//     }

//     try {
//       // Update the idea
//       await updateProductIdea(ideaId, idea.ownerId, {
//         title: data.title,
//         summary: data.summary,
//         status: data.status as ProductIdeaStatus,
//         tags: data.tags as ProductIdeaTag[],
//         priority: data.priority as ProductIdeaPriority,
//       });

//       // Fetch the updated idea to return it
//       const updatedIdea = await getProductIdea(ideaId);

//       if (updatedIdea) {
//         onSuccess?.(updatedIdea);
//       } else {
//         // Fallback if we can't fetch the updated idea
//         onSuccess?.({
//           ...idea,
//           ...data,
//           updatedAt: Timestamp.now(),
//         } as ProductIdea);
//       }

//       onOpenChange(false);
//     } catch (error) {
//       setError("root", {
//         type: "server",
//         message:
//           error instanceof Error
//             ? error.message
//             : "Failed to update idea. Please try again.",
//       });
//     }
//   };

//   if (!canEdit) {
//     return (
//       <Dialog open={open} onOpenChange={onOpenChange}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>Permission Required</DialogTitle>
//             <DialogDescription>
//               You don't have permission to edit this product idea.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button
//               variant="filled"
//               semantic="neutral"
//               onClick={() => onOpenChange(false)}
//             >
//               Close
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     );
//   }

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="headline-3">Edit Product Idea</DialogTitle>
//           <DialogDescription className="body-2">
//             Update the details of this product idea
//           </DialogDescription>
//         </DialogHeader>

//         {errors.root?.message && (
//           <InlineAlert variant="warning" dismissible>
//             {errors.root.message}
//           </InlineAlert>
//         )}

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-section">
//           <FieldSet disabled={!canEdit}>
//             <FieldGroup>
//               <FieldLegend>Basic Information</FieldLegend>

//               <FormInput
//                 control={control}
//                 name="title"
//                 label="Title"
//                 required
//                 error={errors.title}
//                 maxLength={100}
//                 showCharCount
//               />

//               <FormTextarea
//                 control={control}
//                 name="summary"
//                 label="Summary"
//                 required
//                 error={errors.summary}
//                 maxLength={1000}
//                 rows={5}
//               />
//             </FieldGroup>

//             <FieldSeparator />

//             <FieldGroup>
//               <FieldLegend>Classification</FieldLegend>

//               <ResponsiveGrid maxColumns="two" className="gap-section">
//                 <FormSelect
//                   control={control}
//                   name="status"
//                   label="Status"
//                   required
//                   error={errors.status}
//                   options={IDEA_STATUSES.map((s) => ({
//                     value: s.value,
//                     label: s.label,
//                     description: s.description,
//                   }))}
//                 />

//                 <FormSelect
//                   control={control}
//                   name="priority"
//                   label="Priority"
//                   error={errors.priority}
//                   options={IDEA_PRIORITIES.map((p) => ({
//                     value: p.value,
//                     label: p.label,
//                     description: p.description,
//                   }))}
//                 />
//               </ResponsiveGrid>

//               <FormTagSelect
//                 control={control}
//                 name="tags"
//                 label="Tags"
//                 error={errors.tags}
//                 options={[...PRODUCT_IDEA_TAG_VALUES]}
//                 maxTags={10}
//               />
//             </FieldGroup>
//           </FieldSet>

//           <DialogFooter className="gap-inline pt-section border-t border-border">
//             <Button
//               type="button"
//               variant="filled"
//               semantic="neutral"
//               onClick={() => onOpenChange(false)}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               variant="filled"
//               semantic="primary"
//               disabled={!isDirty || isSubmitting}
//             >
//               {isSubmitting ? "Saving..." : "Save Changes"}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }
