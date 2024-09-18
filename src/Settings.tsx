import { Forms } from "@vendetta/ui/components";
const { FormText, FormItem, FormSection } = Forms;

export default () => (
    <FormSection title="Custom Tags Settings">
        <FormItem>
            <FormText>
                Manage your custom tags here.
            </FormText>
        </FormItem>
        {/* Add any additional form elements for settings configuration here */}
    </FormSection>
);
