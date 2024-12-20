import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import AssetsList from '@/components/AssetsList';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Assets, calculateSemiAnnualCompoundAssets } from '@/lib/core';

const FormSchema = z.object({
  currentAge: z.string(),
  retirementAge: z.string(),
  monthlySavings: z.string(),
  monthlyInvestment: z.string(),
  annualReturnRate: z.string(),
});

function App() {
  const [result, setResult] = useState<Assets[]>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currentAge: '20',
      retirementAge: '65',
      monthlySavings: '1000',
      monthlyInvestment: '1000',
      annualReturnRate: '5',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setResult(
      calculateSemiAnnualCompoundAssets(
        parseInt(data.currentAge),
        parseInt(data.retirementAge),
        parseInt(data.monthlySavings),
        parseInt(data.monthlyInvestment),
        parseInt(data.annualReturnRate)
      )
    );
  }

  return (
    <Layout>
      <div className="w-full h-full flex items-start justify-center gap-6  max-w-screen-xl mx-auto px-4">
        <div className="w-96 flex-shrink-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="currentAge"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormLabel className="flex-shrink-0 w-24">
                      現在年紀
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="18" {...field} />
                    </FormControl>
                    歲
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="retirementAge"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormLabel className="flex-shrink-0 w-24">
                      退休年齡
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="65" {...field} />
                    </FormControl>
                    歲
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="monthlySavings"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormLabel className="flex-shrink-0 w-24">
                      每月儲蓄金額
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="1000" {...field} />
                    </FormControl>
                    元
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="monthlyInvestment"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormLabel className="flex-shrink-0 w-24">
                      每月投資金額
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="1000" {...field} />
                    </FormControl>
                    元
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="annualReturnRate"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormLabel className="flex-shrink-0 w-24">
                      年化報酬率
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="5" {...field} />
                    </FormControl>
                    %
                  </FormItem>
                )}
              />
              <div className="text-right">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="flex-1 overflow-y-scroll h-[calc(100vh-100px)]">
          <AssetsList dataSource={result} />
        </div>
      </div>
    </Layout>
  );
}

export default App;
