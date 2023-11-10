const FORM_SUBSCRIPTION = {
  errors: true,
  invalid: true,
  submitting: true,
  hasValidationErrors: true,
};

const FORM_VALUES_ONLY = {
  values: true,
};

const FORM_SUBMISSION_ONLY = {
  submitting: true,
};

const FORM_WITH_VALUES = {
  ...FORM_SUBSCRIPTION,
  ...FORM_VALUES_ONLY,
};

const FORM_WITH_DIRT = {
  ...FORM_SUBSCRIPTION,
  dirty: true,
};

const FORM_WITH_DIRTY_VALUES = {
  ...FORM_WITH_VALUES,
  dirty: true,
};

export {
  FORM_WITH_DIRT,
  FORM_VALUES_ONLY,
  FORM_WITH_VALUES,
  FORM_SUBSCRIPTION,
  FORM_SUBMISSION_ONLY,
  FORM_WITH_DIRTY_VALUES,
};
