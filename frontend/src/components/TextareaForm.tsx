import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

// Define your validation schema using zod
const FormSchema = z.object({
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 160 characters.",
    }),
  title: z
    .string()
    .min(10, {
      message: "Title must be at least 10 characters.",
    })
    .max(30, {
      message: "Title must not be longer than 30 characters.",
    }),
});

const BASE_URL = "https://server.chauhanadityac01.workers.dev";

// Define the API call
const createPost = async (
  axios: AxiosInstance,
  data: z.infer<typeof FormSchema>,
) => {
  const response = await axios.post(BASE_URL, {
    title: data.title,
    content: data.bio,
  });
  return response.data;
};

export function TextareaForm({ axios }: { axios: AxiosInstance }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (data: z.infer<typeof FormSchema>) => createPost(axios, data),
    {
      onSuccess: (data) => {
        toast({
          title: "Post created successfully!",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
        queryClient.invalidateQueries("posts"); // Invalidate posts query if you have one
      },
      onError: (error: any) => {
        toast({
          title: "Error creating post",
          description: error.message,
        });
      },
    },
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your title"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
