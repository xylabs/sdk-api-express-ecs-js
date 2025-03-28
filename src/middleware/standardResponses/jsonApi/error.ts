import type { ApiLinks } from './links.ts'

/**
 * An object containing references to the source of the error
 */
export interface Source {
  /**
   * A string indicating which URI query parameter caused the error.
   */
  parameter?: string
  /**
   * A JSON Pointer [RFC6901] to the associated entity in the request document [e.g. "/data" for a primary data object,
   * or "/data/attributes/title" for a specific attribute].
   */
  pointer?: string
}

export interface ApiError {
  /**
   *  An application-specific error code, expressed as a string value.
   */
  code?: string
  /**
   *  A human-readable explanation specific to this occurrence of the problem. Like title, this field's value can be localized.
   */
  detail?: string
  /**
   *  A unique identifier for this particular occurrence of the problem.
   */
  id?: string
  /**
   *  A links object containing the following members:
   *    about: a link that leads to further details about this particular occurrence of the problem
   */
  links?: ApiLinks
  /**
   *  A meta object containing non-standard meta-information about the error.
   */
  meta?: Record<string, unknown>
  /**
   *  An object containing references to the source of the error, optionally including any of the following members:
   */
  source?: Source
  /**
   *  The HTTP status code applicable to this problem, expressed as a string value.
   */
  status?: string
  /**
   *  A short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
   */
  title?: string
}
