import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import generalService from '@/services/generalService'
import { Check, ChevronsDown, Loader2 } from 'lucide-react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>
  onSelect: (selectedCityId: number) => void
  formFieldName: Path<T>
  outlined?: boolean
}

export default function CitySelectField<T extends FieldValues>({
  form,
  onSelect,
  formFieldName,
  outlined = false,
}: Props<T>) {
  const { data: allCities, isLoading: loadingAllCities } = generalService.read()

  return (
    <FormField
      control={form.control}
      name={formFieldName}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="formField"
                  role="combobox"
                  className={cn(
                    'justify-between',
                    !field.value && 'text-muted-foreground',
                    outlined && 'outlined-field'
                  )}
                >
                  {field.value && allCities ? allCities.find((e) => e.id === field.value)?.name : 'City'}
                  {loadingAllCities ? (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ChevronsDown className="ml-2 h-4 w-4 shrink-0" />
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[270px] p-0">
              <Command>
                <CommandInput placeholder="search city" />
                <CommandEmpty>Not Found!</CommandEmpty>
                <CommandGroup>
                  {allCities?.map((e) => (
                    <CommandItem value={e.id.toString()} key={e.id.toString()} onSelect={() => onSelect(e.id)}>
                      <Check className={cn('mr-2 h-4 w-4', e.id === field.value ? 'opacity-100' : 'opacity-0')} />
                      {e.name}
                      <span className="opacity-50 ms-1">({e.municipality})</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
